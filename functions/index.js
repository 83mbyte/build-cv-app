/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { OpenAI } = require("openai");
const admin = require("firebase-admin");
const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { defineSecret } = require('firebase-functions/params');

const functionsV1auth = require('firebase-functions/v1/auth');

const STRIPE_WHSEC = defineSecret('STRIPE_WHSEC');
const STRIPE_SECRET = defineSecret('STRIPE_SECRET');
const PDF_PRICE_ID = process.env.PDF_PRICE_ID;

const gptAPI = require('./lib/gptAPI');
const stripeAPI = require("./lib/stripeAPI");

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
        return resp.status(500).json({ message: `${assistReply?.message || 'Internal Server Error.'}`, status: 'Error', code: 500 });
    }

    return resp.status(200).json({ content: assistReply.content[0].message.content, status: 'Success', code: 200, systemPrompt: assistReply.systemPrompt })
}

exports.interview = onRequest(
    {
        // DEV
        // cors: true,

        // PROD
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

                const isTokenVerified = await verifyToken(accessToken);
                if (!isTokenVerified || isTokenVerified.status == false) {
                    return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
                }
                const aiKey = process.env.AIKEY;

                if (!aiKey || !query) {

                    return resp.status(500).json({ message: 'Internal Server Error.', status: 'Error', code: 500 });
                }
                await requestToGPT({ resp, aiKey, query, variant: 'interview' })
            }

            else {
                return resp.status(400).json({ message: 'Bad request.', status: 'Error', code: 400 });
            }

        } //end of else about POST
    } //end of async(req,resp)
)


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

                const isTokenVerified = await verifyToken(accessToken);
                if (!isTokenVerified || isTokenVerified.status == false) {
                    return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
                }
                const aiKey = process.env.AIKEY;

                if (!aiKey || !query) {

                    return resp.status(500).json({ message: 'Internal Server Error.', status: 'Error', code: 500 });
                }
                await requestToGPT({ resp, aiKey, query, variant: 'adviser' })
            }

            else {
                return resp.status(400).json({ message: 'Bad request.', status: 'Error', code: 400 });
            }
        }
    }
)

exports.coverLetterCreate = onRequest(
    {
        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
        secrets: ['AIKEY'],
    },
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error' });
        }

        if (req.body) {
            let { accessToken, query } = req.body;

            const isTokenVerified = await verifyToken(accessToken);

            if (!isTokenVerified || isTokenVerified.status == false) {
                return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
            }

            const aiKey = process.env.AIKEY;

            if (!query || !aiKey) {

                return resp.status(500).json({ message: 'Internal Server Error.', status: 'Error', code: 500 });
            }
            await requestToGPT({ resp, aiKey, query, variant: 'professional' })
        }

        else {
            return resp.status(400).json({ message: 'Bad request.', status: 'Error', code: 400 });
        }
    })

exports.summaryCreate = onRequest(
    {
        cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
        secrets: ['AIKEY'],
    },
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error' });
        }
        if (req.body) {
            let { accessToken, query } = req.body;

            const isTokenVerified = await verifyToken(accessToken);

            if (!isTokenVerified || isTokenVerified.status == false) {
                return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
            }

            const aiKey = process.env.AIKEY;

            if (!query || !aiKey) {

                return resp.status(500).json({ message: 'Internal Server Error.', status: 'Error', code: 500 });
            }
            await requestToGPT({ resp, aiKey, query, variant: 'summary' })
        }

        else {
            return resp.status(400).json({ message: 'Bad request.', status: 'Error', code: 400 });
        }
    }
)

// STRIPE related functions

exports.createCheckoutSession = onRequest({
    // cors: true,
    cors: [`https://${process.env.APP_DOMAIN_MAIN}`, `https://${process.env.APP_DOMAIN_SECOND}`, `https://${process.env.APP_DOMAIN_CUSTOM}`],
    secrets: ['STRIPE_SECRET']
},
    async (req, resp) => {
        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error' });
        }

        if (req.body) {
            let { accessToken } = req.body;

            const isTokenVerified = await verifyToken(accessToken);

            if (!isTokenVerified || isTokenVerified.status == false) {
                return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
            }


            const stripeKey = STRIPE_SECRET.value();
            const customer_email = isTokenVerified.email;
            const customer_id = isTokenVerified.uid;

            let result = null;
            try {

                result = await stripeAPI.createSession(stripeKey, PDF_PRICE_ID, customer_email, customer_id, req.headers.origin);

                if (result && result.status == 'Success') {
                    resp.status(200).json({ content: result.content, status: 'Success' })
                } else {
                    throw new Error('Internal Server Error')
                }

            } catch (error) {

                return resp.status(500).json({ message: 'Internal Server Error.', status: 'Error' });
            }
        }
        else {
            return resp.status(400).json({ message: 'Bad request.', status: 'Error', code: 400 });
        }
    })
exports.webhookStr = onRequest(
    {
        // cors: true,
        // PROD
        cors: [/stripe\.com$/],
        secrets: ['STRIPE_WHSEC', 'STRIPE_SECRET']
    },
    async (req, resp) => {

        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request.' });
        };



        try {
            const payloadBody = req.rawBody;
            const sig = req.headers['stripe-signature'];
            const endpointSecret = STRIPE_WHSEC.value();
            const stripeKey = STRIPE_SECRET.value();

            let respWebhookStr = await stripeAPI.webhookEventCheck(stripeKey, endpointSecret, sig, payloadBody);
            if (respWebhookStr && respWebhookStr.status == 'Default_Return') {
                return resp.status(200).end();
            }
            if (respWebhookStr && respWebhookStr.status !== 'Success') {

                throw new Error(respWebhookStr.message)
            } else {

                if (respWebhookStr.userId && respWebhookStr.message === 'Payment completed') {
                    let userId = respWebhookStr.userId;
                    let paidServiceRef = db.ref(`${process.env.APP_DB_USERS}/${userId}/paidServices/data/`)
                    const pdfRef = paidServiceRef.child('pdf');
                    pdfRef.set({
                        isAllowed: true,
                        filesAllowed: 3
                    });
                }
                return resp.status(200).end();
            }
        } catch (error) {
            console.log(`Unsuccessful transaction.. ${error.message}`);
            // return resp.status(500).send(`Unsuccessful transaction.. ${error.message}`);
        }

        return resp.status(200).end();
    }
)


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