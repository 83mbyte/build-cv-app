/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

require('firebase-functions/logger/compat'); //to show logs in goglecloudconsole

const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
const { getAppCheck } = require('firebase-admin/app-check');
const { getDownloadURL } = require('firebase-admin/storage');
const { onRequest } = require('firebase-functions/v2/https');
const { setGlobalOptions } = require('firebase-functions/v2');
const { defineSecret } = require('firebase-functions/params');
const functionsV1auth = require('firebase-functions/v1/auth');
const { OpenAI } = require('openai');

const slugify = require('slugify');

const { generatePDFfromHTML } = require('./lib/adobeAPI');
const stripeAPI = require('./lib/stripeAPI');
const gptAPI = require('./lib/gptAPI');

const STRIPE_WHSECRET = defineSecret('STRIPE_WHSECRET');
// const PDF_PRICE_ID = process.env.PDF_PRICE_ID;
const STRIPE_SECRET = defineSecret('STRIPE_SECRET');
const SUBSCRIPTION_PRICE_ID = process.env.SUBSCRIPTION_PRICE_ID;

const app = admin.initializeApp();
const db = admin.database();
setGlobalOptions({ maxInstances: 10 });

const verifyToken = async (userToken) => {
    return await admin
        .auth(app)
        .verifyIdToken(userToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            const email = decodedToken.email;

            return { status: true, uid, email, message: 'Token verified successfully' };
        })
        .catch((error) => {
            return { status: false, uid: null, message: 'Unauthorized request' };
        });
};

const requestToGPT = async ({ aiKey, query, variant = 'professional' }) => {
    const openai = new OpenAI({
        apiKey: aiKey,
    });

    let assistReply = await gptAPI.createCompletions(openai, query, variant);

    if (!assistReply.success) {
        return { message: assistReply?.message ?? 'Internal Server Error.', status: 'Error', code: 500 };
    }

    return { content: assistReply.content[0].message.content, status: 'Success', code: 200, systemPrompt: assistReply.systemPrompt };
};
// generate data by AI
exports.generateData = onRequest(
    {
        // cors: true,

        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
        secrets: ['AIKEY'],
    },
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error' });
        } else {
            const isEmulator = process.env.FUNCTIONS_EMULATOR === 'true';

            const appCheckToken = req.header('X-Firebase-AppCheck');
            if (!appCheckToken) {
                return resp.status(401).json({ error: 'Unauthorized: No token', code: 401, status: 'Error' });
            }
            try {
                // const claims = await getAppCheck().verifyToken(appCheckToken, { consume: !isEmulator });
                const claims = await getAppCheck().verifyToken(appCheckToken);
                // console.log('valid token')
            } catch (error) {
                if (isEmulator) {
                    console.error('Error while token validation:', error);
                }
                return resp.status(401).json({ error: 'Unauthorized: Invalid token', code: 401, status: 'Error' });
            }

            if (req.body) {
                let { accessToken, query, variant } = req.body;

                // const isTokenVerified = await verifyToken(accessToken);
                // if (!isTokenVerified || isTokenVerified.status == false) {
                //     return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
                // }
                const aiKey = process.env.AIKEY;

                if (!aiKey || !query) {
                    return resp.status(500).json({ message: 'Internal Server Error.', status: 'Error', code: 500, success: false });
                }

                let result = await requestToGPT({ aiKey, query, variant });
                if (result.status !== 'Success') {
                    //  unsuccess
                    return resp.status(500).json(result);
                } else {
                    // if OK
                    return resp.status(200).json(result);
                }
            } else {
                return resp.status(400).json({ message: 'Bad request.', status: 'Error', code: 400, success: false });
            }
        }
    }
);

exports.streamPDFtoClient = onRequest(
    {
        // DEV
        // cors: true,

        // PROD
        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
    },
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ message: 'Bad request.', code: 400, status: 'Error' });
        }
        const { fileName, userId, accessToken } = req.body;

        const isTokenVerified = await verifyToken(accessToken);
        if (!isTokenVerified || isTokenVerified.status == false) {
            return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
        }

        const bucket = admin.storage().bucket();
        const filePath = `users/${userId}/resume/${fileName}`;
        const filePDF = bucket.file(filePath);

        const readStream = filePDF.createReadStream();
        resp.setHeader('Content-Disposition', 'attachment; filename=' + filePath.split('/').pop());
        resp.setHeader('Content-Type', 'application/pdf');
        readStream.pipe(resp);

        readStream.on('error', (err) => {
            console.error('Error while reading pdf file:', err);
            resp.status(500).json({ status: 'Error', message: 'Error while uploading to Firebase Storage.' });
        });
    }
);

exports.createPDFfromTemplate = onRequest(
    {
        // DEV
        // cors: true,

        // PROD
        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
        secrets: ['PDF_SERVICES_CLIENT_ID', 'PDF_SERVICES_CLIENT_SECRET'],
    },
    async (req, resp) => {

        if (req.method !== 'POST') {
            return resp.status(400).json({ message: 'Bad request.', code: 400, status: 'Error' });
        }

        if (req.body) {
            const { htmlString, userId, accessToken } = req.body;

            const isTokenVerified = await verifyToken(accessToken);
            if (!isTokenVerified || isTokenVerified.status == false) {
                return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
            }

            const bucket = admin.storage().bucket();
            const fileNameHTML = `users/${userId}/resume/template.html`;
            const fileHTML = bucket.file(fileNameHTML);

            // create HTML and get URL to convert to PDF
            let fileUrl;
            try {
                await fileHTML.save(htmlString, {
                    contentType: 'text/html',
                });
                fileURL = await getDownloadURL(fileHTML);
            } catch (error) {
                resp.status(500).json({ status: 'Error', message: error.message ? error.message : 'Error while createHTMLfromString ...' });
            }

            const credentialsServicePDF = {
                id: process.env.PDF_SERVICES_CLIENT_ID,
                secret: process.env.PDF_SERVICES_CLIENT_SECRET,
            };
            const fileName = `users/${userId}/resume/resume_${Date.now()}.pdf`;
            const filePDF = bucket.file(fileName);

            let pdfResult = await generatePDFfromHTML({ credentialsServicePDF, fileURL, userId, getDownloadURL, filePDF });

            if (pdfResult && pdfResult.status == 'Success') {
                resp.status(200).json({ status: 'Success', message: `PDF file available on: ${pdfResult.url}`, url: pdfResult.url });
            } else {
                resp.status(500).json({ status: 'Error', message: pdfResult?.message ? pdfResult.message : 'Something wrong. Unable to download the PDF file.' });
            }
        }
    }
);

exports.blogPublish = onRequest(
    {
        //dev
        // cors: true,
        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
    },
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error', success: false });
        }
        if (req.body) {
            let { accessToken, text, title } = req.body;

            const isTokenVerified = await verifyToken(accessToken);
            if (!isTokenVerified || isTokenVerified.status == false) {
                return resp.status(401).json({ status: 'Error', message: isTokenVerified.message, success: false });
            }

            // create and save data of the blog article to db
            const slugAsId = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g });
            const id = Date.now();
            const dbBlog = db.ref(`${process.env.APP_DB_BLOG}${slugAsId}`);
            dbBlog.set(
                {
                    id,
                    text,
                    title,
                },
                (error) => {
                    if (error) {
                        resp.status(200).json({ success: false, error: error.message });
                    } else {
                        resp.status(200).json({ success: true });
                    }
                }
            );
        } else {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error', success: false });
        }
    }
);

exports.contactForm = onRequest(
    {
        // cors: true,
        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
    },
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error', success: false });
        }
        if (req.body) {
            let { reason, id, name, email, message } = req.body;
            // resp.status(200).json({ success: true })
            const dbContact = db.ref(`${process.env.APP_DB_CONTACT}${reason}/${id}`);
            dbContact.update(
                {
                    name,
                    email,
                    message,
                },
                (error) => {
                    if (error) {
                        resp.status(200).json({ success: false, error: error.message });
                    } else {
                        // if OK - return success
                        resp.status(200).json({ success: true });
                    }
                }
            );
        } else {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error', success: false });
        }
    }
);

exports.getSubscriptionDetails = onRequest(
    {
        // cors: true,
        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
    },
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request' });
        }
        const { userId, accessToken } = req.body;

        const isTokenVerified = await verifyToken(accessToken);
        if (!isTokenVerified || isTokenVerified.status == false) {
            return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
        }
        try {
            const dbCustomerIdRef = db.ref(`${process.env.APP_DB_USERS}${userId}${process.env.APP_DB_PATH_TO_CUSTOMER_ID}`);
            let data = await dbCustomerIdRef.once('value').then((snapshot) => {
                return snapshot.val();
            });

            const dbsubscriptionIdRef = db.ref(`${process.env.APP_DB_SUBSCRIPTIONS_NEW}${data.subscriptionId}`);
            let data2 = await dbsubscriptionIdRef.once('value').then((snapshot) => {
                return snapshot.val();
            });

            const result = {
                ...data,
                cancelAtPeriodEnd: data2.cancelAtPeriodEnd,
                currentPeriodEnd: data2.currentPeriodEnd,
                status: data2.status,
                currentTime: Date.now(),
            };

            return resp.status(200).json(result); // return subscription details {customerId, subscriptionId,cancelAtPeriodEnd,currentPeriodEnd,status}
        } catch (error) {
            return resp.status(500).end(error.message);
            // return resp.status(500).end('Internal Server Error')
        }
    }
);

// ------- STRIPE   ------
exports.createSetupIntent = onRequest(
    {
        // cors: true,
        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
        secrets: ['STRIPE_SECRET'],
    },
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error', success: false });
        } else {
            try {
                const stripeKey = STRIPE_SECRET.value();
                const result = await stripeAPI.createSetupIntent(stripeKey);
                resp.status(200).json(result);
            } catch (error) {
                resp.status(500).json({ error: 'Internal Server Error', success: false });
            }
        }
    }
);
exports.createSubscriptionIntent = onRequest(
    {
        // cors: true,
        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
        secrets: ['STRIPE_SECRET'],
    },
    async (req, resp) => {
        const { paymentMethodId, email, password, firstName, lastName } = req.body;

        if (email && password && paymentMethodId) {
            try {
                // check if the provided email does not exist before accepting a payment
                const emailInUse = await isEmailAlreadyExists(email);
                if (emailInUse === true) {
                    throw new Error('try to use another email');
                }

                const stripeKey = STRIPE_SECRET.value();
                const result = await stripeAPI.createSubscriptionIntent(stripeKey, SUBSCRIPTION_PRICE_ID, paymentMethodId, email);

                if (result.success == true && result.subscription.status == 'active') {
                    let newUserId = await registerUser(email, password, firstName, lastName);

                    if (newUserId) {
                        await createDBforNewUser(newUserId, email, result.subscription.id, result.subscription.customer);
                    }
                    resp.status(200).json({
                        success: true,
                        subscription: {
                            status: 'active',
                            id: result.subscription.id,
                            amount: (result.subscription.items.data[0].plan.amount) / 100 || null
                        }
                    });

                } else if (result.success == true && result.subscription.status == 'incomplete') {
                    resp.status(200).json({ success: true, subscription: { status: 'incomplete', id: result.subscription.id } });
                } else {
                    throw new Error(result.error);
                }

                // resp.status(200).json(result);
            } catch (error) {
                // console.log('error subscription: ', error)
                resp.status(200).json({ success: false, error: error.message ?? 'Unable to create a subscription - lack of necessary information' });
            }
        }
    }
);
exports.manageSubscriptionPortal = onRequest(
    {
        // cors: true,
        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
        secrets: ['STRIPE_SECRET'],
    },
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request' });
        }
        const { customerId, accessToken } = req.body;
        const isTokenVerified = await verifyToken(accessToken);
        if (!isTokenVerified || isTokenVerified.status == false) {
            return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
        }
        try {
            const stripeKey = STRIPE_SECRET.value();
            let result = await stripeAPI.createSubscriptionPortalSession(stripeKey, customerId, `https://${process.env.SUBSCRIPTION_PORTAL_RETURN_URL}`);
            if (result && result.success) {
                resp.status(200).json(result);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            resp.status(500).json({ error: error.message ? error.message : 'Internal Server Error' });
        }
    }
);

const updateSubscriptionData = (dbSubscription, data) => {
    const subscriptionRef = dbSubscription.child(data.subscriptionId);
    subscriptionRef.update({ ...data });
};

exports.subscriptionWebhook = onRequest(
    {
        // cors: true,
        // PROD
        cors: [/stripe\.com$/],
        secrets: ['STRIPE_WHSECRET', 'STRIPE_SECRET'],
    },
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request' });
        }

        try {

            const payloadBody = req.rawBody;
            const sig = req.headers['stripe-signature'];
            const endpointSecret = STRIPE_WHSECRET.value();
            const stripeKey = STRIPE_SECRET.value();

            const dbSubscription = db.ref(process.env.APP_DB_SUBSCRIPTIONS_NEW);

            let respWebhook = await stripeAPI.webhookEventCheck(stripeKey, endpointSecret, sig, payloadBody);

            if (respWebhook && respWebhook.status == 'Default_Return') {
                return resp.status(200).end();
            }
            if (respWebhook && respWebhook.status == 'Error') {
                throw new Error(respWebhook.message);
            } else {
                if (respWebhook.message == 'Subscription created') {
                    // create subscription
                    // console.log('Subscription created');

                    updateSubscriptionData(dbSubscription, respWebhook.data);
                } else if (respWebhook.message == 'Subscription canceled immediately') {
                    // immediately canceled subscription
                    // console.log('Subscription canceled immediately');

                    updateSubscriptionData(dbSubscription, respWebhook.data);
                } else if (respWebhook.message == 'Subscription scheduled for cancellation') {
                    // Subscription scheduled for cancellation
                    // console.log('Subscription scheduled for cancellation');

                    updateSubscriptionData(dbSubscription, respWebhook.data);
                } else if (respWebhook.message == 'Subscription active or resumed') {
                    // Subscription activated or resumed
                    // console.log('Subscription active or resumed');

                    updateSubscriptionData(dbSubscription, respWebhook.data);
                } else if (respWebhook.message == 'Subscription renewed with invoice.' || respWebhook.message == 'Payment failed for subscription, invoice.') {
                    // paid of failed invoice
                    // console.log('Subscription renewed with invoice. || Payment failed for subscription, invoice.');
                    updateSubscriptionData(dbSubscription, respWebhook.data);
                }

                return resp.status(200).end(`${respWebhook ? JSON.stringify(respWebhook) : 'missed data..'}`);
            }
        } catch (error) {
            // console.log('error', error)
            // console.log('error', error.message);
            let errorJSON = JSON.stringify(error);
            resp.status(200).end(`end while catch error: ${errorJSON}`);
        }

        return resp.status(200).end('default end');
    }
);

const registerUser = async (email, password, firstName, lastName) => {
    let fullName = '';
    if (firstName && lastName) {
        fullName = firstName + ' ' + lastName;
    }

    if (firstName && !lastName) {
        fullName = firstName;
    }

    if (!firstName && lastName) {
        fullName = lastName;
    }

    return getAuth()
        .createUser({
            email: email,
            emailVerified: false,
            password: password,
            displayName: fullName,
            disabled: false,
        })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);
            return userRecord.uid;
        })
        .catch((error) => {
            console.log('Error creating new user:', error);
            return null;
        });
};

const createDBforNewUser = (userId, userEmail, subscriptionId, customerId) => {
    const dbUsers = db.ref(process.env.APP_DB_USERS);
    const userRef = dbUsers.child(userId);

    userRef
        .set({
            userProfile: {
                id: userId,
                email: userEmail,
                subscription: {
                    subscriptionId: subscriptionId,
                    customerId: customerId,
                },
            },
            resume: {
                editorSetting: {
                    themeColor: 'blue',
                    layout: 0,
                },
                fontSettings: {
                    currentFont: null,
                    fontSize: null,
                },
                resumeHeader: {
                    fullName: null,
                    position: null,
                    profileImage: null,
                },
                resumeContact: {
                    phone: null,
                    email: null,
                    location: null,
                    web: null,
                },
                resumeSummary: {
                    isVisible: true,
                    summaryHeading: null,
                    summaryText: null,
                },
                resumeEducation: {
                    isVisible: true,
                    educationHeading: null,
                    items: [],
                },
                resumeExperience: {
                    expHeading: null,
                    isVisible: true,
                    items: [],
                },
                resumeSkills: {
                    isVisible: true,
                    skillsHeading: null,
                    items: [],
                },
                resumeLanguages: {
                    isVisible: false,
                    languagesHeading: null,
                    items: [],
                },
            },
        })
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.log(`ERROR while user ${userId} create: `, error.message);
            return false;
        });

    const dbSubscription = db.ref(process.env.APP_DB_SUBSCRIPTIONS_NEW);
    const subscriptionRef = dbSubscription.child(subscriptionId);
    subscriptionRef
        .update({
            // status: 'active',
            // customer: customerId,
            userId: userId,
            email: userEmail,
        })
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.log(`ERROR while user ${userId} create: `, error.message);
            return false;
        });
};

const isEmailAlreadyExists = (email) => {
    // check if the email exists in registered users list
    return getAuth()
        .getUserByEmail(email)
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            return true;
        })
        .catch((error) => {
            // console.log('Error fetching user data:', error);
            return false;
        });
};

// CONTROL-CENTER
exports.controlCenterActions = onRequest(
    {
        cors: true,
        // cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
        // secrets: ['STRIPE_SECRET'],
    },
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request' });
        }

        // Token verify
        const isEmulator = process.env.FUNCTIONS_EMULATOR === 'true';

        const appCheckToken = req.header('X-Firebase-AppCheck');

        if (!appCheckToken) {
            return resp.status(401).json({ error: 'Unauthorized: No token', code: 401, status: 'Error' });
        }
        try {
            // const claims = await getAppCheck().verifyToken(appCheckToken, { consume: !isEmulator });
            const claims = await getAppCheck().verifyToken(appCheckToken);
            // console.log('valid token')
        } catch (error) {
            if (isEmulator) {
                console.error('Error while token validation:', error);
            }
            return resp.status(401).json({ error: 'Unauthorized: Invalid token', code: 401, status: 'Error' });
        }

        // If token is valid..

        //  TODO   defined functions  to work with control center
        //  TODO   defined functions  to work with control center
        if (req.body) {
            let { accessToken, variant } = req.body;

            let result;
            switch (variant) {
                case 'getUsersList':

                    let usersArray = [];
                    result = await getAuth().listUsers()
                        .then((listUsersResult) => {

                            listUsersResult.users
                                .forEach((userRecord) => {
                                    const dataToShow = {
                                        email: userRecord.email,
                                        creationTime: userRecord.metadata.creationTime
                                    }
                                    usersArray.push(dataToShow);
                                })
                            return usersArray;
                        })
                        .then((usersArray) => {
                            return { status: 'Success', success: true, data: usersArray };
                        })
                        .catch((error) => {
                            console.log('Error listing users:', error);
                            return { status: 'Error', success: false, error: error.message };
                        });

                    // return resp.status(200).json({ status: 'Success', success: true, data: result })
                    break;
                case 'getContactAllData':
                    try {

                        const dbContactRef = db.ref(process.env.APP_DB_CONTACT);

                        const snapshot = await dbContactRef.once('value');
                        if (!snapshot.exists()) {
                            throw new Error('No data found for the specified date');
                        }

                        const data = snapshot.val();

                        result = { status: 'Success', success: true, data: data };

                    } catch (error) {
                        result = { success: false, status: 'Error', error: error.message }
                    }
                    break;

                default:
                    break

            }

            // const isTokenVerified = await verifyToken(accessToken);
            // if (!isTokenVerified || isTokenVerified.status == false) {
            //     return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
            // }


            // return resp.status(200).json({ message: 'finished test' })
            if (result.status !== 'Success') {
                //  unsuccess
                return resp.status(500).json(result);
            } else {
                // if OK
                console.log('Success result')
                return resp.status(200).json(result);
            }
        } else {
            return resp.status(400).json({ message: 'Bad request.', status: 'Error', code: 400, success: false });
        }

    }
)
// CONTROL-CENTER END

// ============================
// -----    STRIPE end --------

// AUTH users DELETE
exports.deleteUser = functionsV1auth.user().onDelete(async (user) => {
    // DELETE a user data (all data) in database while delete user

    const folder = `users/${user.uid}`;
    const bucket = admin.storage().bucket();

    async function deleteUserStorageFolder() {
        // console.log(`Folder ${folder} delete initiated`);
        await bucket.deleteFiles({ prefix: folder });
        // console.log(`Folder ${folder}  deleted`);
        return true;
    }

    async function deleteUserData() {
        const getSubscriptionId = (userId) => {
            const dbCustomerIdRef = db.ref(`${process.env.APP_DB_USERS}${userId}${process.env.APP_DB_PATH_TO_CUSTOMER_ID}`);
            return dbCustomerIdRef
                .once('value')
                .then((snapshot) => {
                    return snapshot.val();
                })
                .then((data) => {
                    return data.subscriptionId;
                })
                .catch((error) => {
                    console.log(`ERROR while user ${userId} subscription data delete: `, error.message);
                    return null;
                });
        };

        const subscriptionId = await getSubscriptionId(user.uid);

        if (subscriptionId) {
            // delete user subscription data
            const dbSubscriptions = db.ref(process.env.APP_DB_SUBSCRIPTIONS_NEW);
            const dbsubscriptionIdRef = dbSubscriptions.child(subscriptionId);
            dbsubscriptionIdRef.set(null);

            //delete user profile data
            const dbUsers = db.ref(`${process.env.APP_DB_USERS}`);
            const userRef = dbUsers.child(user.uid);
            userRef.set(null);

            return true;
        } else {
            throw new Error('no subscription id found');
        }
    }

    await deleteUserStorageFolder().catch((err) => {
        console.error(`Error occurred while deleting the folder: ${folder}`, err);
        return false;
    });

    await deleteUserData().catch((error) => {
        console.log(`Error occurred  while user ${user.uid} delete: `, error.message);
        return false;
    });
});

// exports.setCustomClaims = onRequest({
//     cors: true,

// },
//     async (req, resp) => {
// //use to change user role
//         if (req.method !== 'POST') {
//             return resp.status(400).send('Bad request\r\n');
//         }

//         try {
//             const { email } = req.body;
//             if (email !== process.env.APP_ADMIN_EMAIL_DEV) {
//                 throw new Error('incorrect user\r\n')
//             }

//             getAuth().setCustomUserClaims(process.env.APP_ADMIN_USER_ID, { admin: true })
//                 .then(() => {
//                     // The new custom claims will propagate to the user's ID token the
//                     // next time a new one is issued.
//                     return resp.status(200).send('Success\r\n')
//                 });

//         } catch (error) {

//             return resp.status(500).send(error.message ?? 'Unable to create csutom claims\r\n');
//         }

//     })

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
