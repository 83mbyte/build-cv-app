/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */



const admin = require("firebase-admin");
const { getDownloadURL } = require("firebase-admin/storage");
const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { defineSecret } = require('firebase-functions/params');
const functionsV1auth = require('firebase-functions/v1/auth');
const { OpenAI } = require("openai");

const { generatePDFfromHTML } = require("./lib/adobeAPI");
const stripeAPI = require("./lib/stripeAPI");
const gptAPI = require('./lib/gptAPI');

// const STRIPE_WHSEC = defineSecret('STRIPE_WHSEC');
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
        return resp.status(500).json({ message: assistReply?.message ?? 'fuck', status: 'Error', code: 500 });
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
                const stripeKey = STRIPE_SECRET.value();
                const result = await stripeAPI.createSubscriptionIntent(stripeKey, SUBSCRIPTION_PRICE_ID, paymentMethodId, email);

                resp.status(200).json(result);

            } catch (error) {
                resp.status(200).json({ success: false, error: 'Unable to create a subscription - lack of necessary information' })
            }
        }
    }

)

// ====================================================================================================================================

// exports.webhookStr = onRequest(
//     {
//         // cors: true,
//         // PROD
//         cors: [/stripe\.com$/],
//         secrets: ['STRIPE_WHSEC', 'STRIPE_SECRET']
//     },
//     async (req, resp) => {

//         if (req.method !== 'POST') {
//             return resp.status(400).json({ error: 'Bad request.' });
//         };



//         try {
//             const payloadBody = req.rawBody;
//             const sig = req.headers['stripe-signature'];
//             const endpointSecret = STRIPE_WHSEC.value();
//             const stripeKey = STRIPE_SECRET.value();

//             let respWebhookStr = await stripeAPI.webhookEventCheck(stripeKey, endpointSecret, sig, payloadBody);
//             if (respWebhookStr && respWebhookStr.status == 'Default_Return') {
//                 return resp.status(200).end();
//             }
//             if (respWebhookStr && respWebhookStr.status !== 'Success') {

//                 throw new Error(respWebhookStr.message)
//             } else {

//                 if (respWebhookStr.userId && respWebhookStr.message === 'Payment completed') {
//                     let userId = respWebhookStr.userId;
//                     let paidServiceRef = db.ref(`${process.env.APP_DB_USERS}/${userId}/paidServices/data/`)
//                     const pdfRef = paidServiceRef.child('pdf');
//                     pdfRef.set({
//                         isAllowed: true,
//                         filesAllowed: 3
//                     });
//                 }
//                 return resp.status(200).end();
//             }
//         } catch (error) {
//             console.log(`Unsuccessful transaction.. ${error.message}`);
//             // return resp.status(500).send(`Unsuccessful transaction.. ${error.message}`);
//         }

//         return resp.status(200).end();
//     }
// )

// -----    STRIPE end --------



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
            console.log(`ERROR while user ${user.ui} delete: `, error.message);
            return false
        });
})


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });