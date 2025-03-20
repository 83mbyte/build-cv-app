/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */



const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const { getDownloadURL } = require("firebase-admin/storage");
const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { defineSecret } = require('firebase-functions/params');
const functionsV1auth = require('firebase-functions/v1/auth');
const { OpenAI } = require("openai");

const slugify = require('slugify');

const { generatePDFfromHTML } = require("./lib/adobeAPI");
const stripeAPI = require("./lib/stripeAPI");
const gptAPI = require('./lib/gptAPI');

const STRIPE_WHSEC = defineSecret('STRIPE_WHSEC');
// const PDF_PRICE_ID = process.env.PDF_PRICE_ID;
const STRIPE_SECRET = defineSecret('STRIPE_SECRET');
const SUBSCRIPTION_PRICE_ID = process.env.SUBSCRIPTION_PRICE_ID;

const app = admin.initializeApp();
const db = admin.database();
setGlobalOptions({ maxInstances: 10 });


const verifyToken = async (userToken) => {

    return await admin.auth(app)
        .verifyIdToken(userToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            const email = decodedToken.email;

            return ({ status: true, uid, email, message: 'Token verified successfully' })
        })
        .catch((error) => {
            return ({ status: false, uid: null, message: 'Unauthorized request' })
        });
}

const requestToGPT = async ({ resp, aiKey, query, variant = 'professional' }) => {

    const openai = new OpenAI({
        apiKey: aiKey,
    });

    let assistReply = await gptAPI.createCompletions(openai, query, variant);

    if (assistReply && assistReply.status !== 'Success') {
        return resp.status(500).json({ message: assistReply?.message ?? 'Internal Server Error.', status: 'Error', code: 500 });
        // return resp.status(500).json({ message: `${assistReply?.message || 'Internal Server Error.'}`, status: 'Error', code: 500 });
    }

    return resp.status(200).json({ content: assistReply.content[0].message.content, status: 'Success', code: 200, systemPrompt: assistReply.systemPrompt })
}

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
    });

exports.createPDFfromTemplate = onRequest(
    {
        // DEV
        // cors: true,

        // PROD
        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
        secrets: ['PDF_SERVICES_CLIENT_ID', 'PDF_SERVICES_CLIENT_SECRET']
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
                    contentType: 'text/html'
                });
                fileURL = await getDownloadURL(fileHTML);
            } catch (error) {
                resp.status(500).json({ status: 'Error', message: error.message ? error.message : 'Error while createHTMLfromString ...' });
            }


            const credentialsServicePDF = {
                id: process.env.PDF_SERVICES_CLIENT_ID,
                secret: process.env.PDF_SERVICES_CLIENT_SECRET
            }
            const fileName = `users/${userId}/resume/resume_${Date.now()}.pdf`;
            const filePDF = bucket.file(fileName);

            let pdfResult = await generatePDFfromHTML({ credentialsServicePDF, fileURL, userId, getDownloadURL, filePDF });

            if (pdfResult && pdfResult.status == 'Success') {
                resp.status(200).json({ status: 'Success', message: `PDF file available on: ${pdfResult.url}`, url: pdfResult.url });
            } else {
                resp.status(500).json({ status: 'Error', message: pdfResult?.message ? pdfResult.message : 'Something wrong. Unable to download the PDF file.' });
            }
        }
    });




exports.generateSkills = onRequest(
    {
        //dev
        // cors: true,

        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
        secrets: ['AIKEY']
    },

    async (req, resp) => {

        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error' });
        }
        else {

            if (req.body) {

                let { accessToken, query } = req.body;

                // const isTokenVerified = await verifyToken(accessToken);
                // if (!isTokenVerified || isTokenVerified.status == false) {
                //     return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
                // }
                const aiKey = process.env.AIKEY;

                if (!aiKey || !query) {

                    return resp.status(500).json({ message: 'Internal Server Error.', status: 'Error', code: 500 });
                }
                await requestToGPT({ resp, aiKey, query, variant: 'generateSkills' })
            }

            else {
                return resp.status(400).json({ message: 'Bad request.', status: 'Error', code: 400 });
            }
        }
    }
)

exports.generateSummary = onRequest(
    {
        //dev
        // cors: true,

        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
        secrets: ['AIKEY'],
    },
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error' });
        }
        if (req.body) {
            let { accessToken, query } = req.body;

            // VERIFY TOKEN  in PROD
            // const isTokenVerified = await verifyToken(accessToken);

            // if (!isTokenVerified || isTokenVerified.status == false) {
            //     return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
            // }

            const aiKey = process.env.AIKEY;

            if (!query || !aiKey) {

                return resp.status(500).json({ message: 'Internal Server Error.', status: 'Error', code: 500 });
            }
            await requestToGPT({ resp, aiKey, query, variant: 'generateSummary' })
        }

        else {
            return resp.status(400).json({ message: 'Bad request.', status: 'Error', code: 400 });
        }
    }
)

exports.blogPublish = onRequest({
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
            const slugAsId = slugify(title, { lower: true });
            const id = Date.now();
            const dbBlog = db.ref(`${process.env.APP_DB_BLOG}${slugAsId}`);
            dbBlog.set({
                id,
                text,
                title
            }, (error) => {
                if (error) {
                    resp.status(200).json({ success: false, error: error.message })
                } else {

                    resp.status(200).json({ success: true })
                }
            })


        } else {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error', success: false });
        }
    })

exports.contactForm = onRequest({
    cors: true,
},
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error', success: false });
        }
        if (req.body) {
            let { reason, id, name, email, message } = req.body;
            // resp.status(200).json({ success: true })
            const dbContact = db.ref(`${process.env.APP_DB_CONTACT}${reason}/${id}`);
            dbContact.update({
                name,
                email,
                message
            },
                (error) => {
                    if (error) {
                        resp.status(200).json({ success: false, error: error.message })
                    } else {
                        // if OK - return success
                        resp.status(200).json({ success: true })
                    }
                })
        }
        else {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error', success: false });
        }
    }
)

// ------- STRIPE   ------

exports.createSetupIntent = onRequest({
    // cors: true,
    cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
    secrets: ['STRIPE_SECRET']
},
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error' });
        } else {
            try {
                const stripeKey = STRIPE_SECRET.value();
                const result = await stripeAPI.createSetupIntent(stripeKey);
                resp.status(200).json(result);

            } catch (error) {
                resp.status(500).json({ error: 'Internal Server Error' })
            }

        }
    }
)
exports.createSubscriptionIntent = onRequest({
    // cors: true,
    cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
    secrets: ['STRIPE_SECRET']
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
                    resp.status(200).json({ success: true, subscription: { status: 'active' } });

                } else if (result.success == true && result.subscription.status == 'incomplete') {
                    resp.status(200).json({ success: true, subscription: { status: 'incomplete' } });

                } else {
                    throw new Error()
                }


                // resp.status(200).json(result);

            } catch (error) {
                console.log('error subscription: ', error.message)
                resp.status(200).json({ success: false, error: error.message ?? 'Unable to create a subscription - lack of necessary information' })
            }
        }
    }
)


exports.manageSubscriptionPortal = onRequest({
    cors: true,
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
            let result = await stripeAPI.createSubscriptionPortalSession(stripeKey, customerId, process.env.SUBSCRIPTION_PORTAL_RETURN_URL);
            if (result && result.success) {
                resp.status(200).json(result)
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            resp.status(500).json({ error: error.message ? error.message : 'Internal Server Error' })
        }

    }
)

const updateSubscriptionData = (dbSubscription, data) => {
    const subscriptionRef = dbSubscription.child(data.subscriptionId);
    subscriptionRef.update({ ...data });
}

exports.subscriptionWebhook = onRequest(
    {
        // cors: true,
        // PROD
        cors: [/stripe\.com$/],
        secrets: ['STRIPE_WHSEC', 'STRIPE_SECRET']
    },
    async (req, resp) => {

        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request' });
        }

        try {
            const payloadBody = req.rawBody;
            const sig = req.headers['stripe-signature'];
            const endpointSecret = STRIPE_WHSEC.value();
            const stripeKey = STRIPE_SECRET.value();

            const dbSubscription = db.ref(process.env.APP_DB_SUBSCRIPTIONS_NEW);

            let respWebhook = await stripeAPI.webhookEventCheck(stripeKey, endpointSecret, sig, payloadBody);

            if (respWebhook && respWebhook.status == 'Default_Return') {
                return resp.status(200).end();
            }
            if (respWebhook && respWebhook.status == 'Error') {

                throw new Error(respWebhook.message)
            } else {

                if (respWebhook.message == 'Subscription created') {
                    // create subscription 
                    updateSubscriptionData(dbSubscription, respWebhook.data);

                } else if (respWebhook.message == 'Subscription canceled immediately') {
                    // immediately canceled subscription
                    updateSubscriptionData(dbSubscription, respWebhook.data);

                } else if (respWebhook.message == 'Subscription scheduled for cancellation') {
                    // Subscription scheduled for cancellation
                    updateSubscriptionData(dbSubscription, respWebhook.data);

                } else if (respWebhook.message == 'Subscription active or resumed') {
                    // Subscription activated or resumed
                    updateSubscriptionData(dbSubscription, respWebhook.data);

                } else if (respWebhook.message == 'Subscription renewed with invoice.' || respWebhook.message == 'Payment failed for subscription, invoice.') {
                    // paid of failed invoice
                    updateSubscriptionData(dbSubscription, respWebhook.data);
                }

                return resp.status(200).end();
            }
        } catch (error) {
            console.log('error', error.message)
        }

        return resp.status(200).end();
    }
)

const registerUser = async (email, password, firstName, lastName,) => {

    return getAuth()
        .createUser({
            email: email,
            emailVerified: false,
            password: password,
            displayName: firstName + ' ' + lastName,
            disabled: false,
        })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);
            return userRecord.uid
        })
        .catch((error) => {
            console.log('Error creating new user:', error);
            return null
        });
}

const createDBforNewUser = (userId, userEmail, subscriptionId, customerId) => {

    const dbUsers = db.ref(process.env.APP_DB_USERS_NEW);
    const userRef = dbUsers.child(userId);

    userRef.set({
        userProfile: {
            id: userId,
            email: userEmail,
            subscription: {
                subscriptionId: subscriptionId,
                customerId: customerId,
            }
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
            }
        },

    }).then(() => {
        return true
    }).catch((error) => {
        console.log(`ERROR while user ${userId} create: `, error.message);
        return false
    });

    const dbSubscription = db.ref(process.env.APP_DB_SUBSCRIPTIONS_NEW);
    const subscriptionRef = dbSubscription.child(subscriptionId);
    subscriptionRef.update({
        // status: 'active',
        // customer: customerId,
        userId: userId,
        email: userEmail,
    }).then(() => {
        return true
    }).catch((error) => {
        console.log(`ERROR while user ${userId} create: `, error.message);
        return false
    });
}

const isEmailAlreadyExists = (email) => {
    // check if the email exists in registered users list
    return getAuth().getUserByEmail(email)
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            return true
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
            return false
        });
}
// ============================
// -----    STRIPE end --------

exports.createUserOnSignup = functionsV1auth.user().onCreate((user) => {

    let dbUsers = db.ref(process.env.APP_DB_USERS_NEW);
    let userRef = dbUsers.child(user.uid);
    userRef.set({
        userProfile: {
            id: user.uid,
            email: user.email,
            subscription: {
                subscription: null,
                customer: null,
            }
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
            }


        },

    }).then(() => {
        return true
    }).catch((error) => {
        console.log(`ERROR while user ${user.uid} create: `, error.message);
        return false
    });
});

// AUTH users DELETE
exports.deleteUser = functionsV1auth.user().onDelete((user) => {

    // DELETE a user data (all data) in database while delete user

    let dbUsers = db.ref(`${process.env.APP_DB_USERS}/`);
    let userRef = dbUsers.child(user.uid);
    userRef.set(null)
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.log(`ERROR while user ${user.uid} delete: `, error.message);
            return false
        });
})



exports.getSubscriptionDetails = onRequest(
    {
        cors: true,
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

            const dbCustomerIdRef = db.ref(`${process.env.APP_DB_USERS_NEW}${userId}${process.env.APP_DB_PATH_TO_CUSTOMER_ID}`);
            let data = await dbCustomerIdRef.once('value').then((snapshot) => {
                return snapshot.val()
            });

            const dbsubscriptionIdRef = db.ref(`${process.env.APP_DB_SUBSCRIPTIONS_NEW}${data.subscriptionId}`);
            let data2 = await dbsubscriptionIdRef.once('value').then((snapshot) => {
                return snapshot.val()
            })

            const result = {
                ...data,
                cancelAtPeriodEnd: data2.cancelAtPeriodEnd,
                currentPeriodEnd: data2.currentPeriodEnd,
                status: data2.status,
                currentTime: Date.now()
            };

            return resp.status(200).json(result); // return subscription details {customerId, subscriptionId,cancelAtPeriodEnd,currentPeriodEnd,status} 


        } catch (error) {
            return resp.status(500).end(error.message)
            // return resp.status(500).end('Internal Server Error')
        }
    }
)

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