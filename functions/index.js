/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { getAuth } = require("firebase-admin/auth");
const { initializeApp } = require("firebase-admin/app");
const { OpenAI } = require("openai");

const gptAPI = require('./lib/gptAPI');
let app = initializeApp();

setGlobalOptions({ maxInstances: 10 });



const verifyToken = async (userToken) => {
    return await getAuth(app)
        .verifyIdToken(userToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            return ({ status: true, uid, message: 'Token verified successfully' })
        })
        .catch((error) => {
            return ({ status: false, uid: null, message: 'Unauthorized request' })
        });
}



exports.generateSkills = onRequest(
    {
        //dev
        // cors: true,
        //dev
        cors: [process.env.APP_DOMAIN_MAIN, process.env.APP_DOMAIN_SECOND, process.env.APP_DOMAIN_CUSTOM],
        secrets: ['AIKEY']
    },
    //{ cors: true },
    async (req, resp) => {

        if (req.method !== 'POST') {
            return resp.status(400).json({ error: 'Bad request.', code: 400, status: 'Error' });
        }
        else {

            if (req.body) {
                let data = req.body;

                const isTokenVerified = await verifyToken(data.accessToken);
                if (!isTokenVerified || isTokenVerified.status == false) {
                    return resp.status(401).json({ status: 'Error', message: isTokenVerified.message });
                }
                const openai = new OpenAI({
                    apiKey: process.env.AIKEY,
                });
                let assistReply = await gptAPI.createCompletions(openai, data.query, variant = 'adviser');

                if (assistReply && assistReply.status !== 'Success') {
                    return resp.status(500).json({ message: `${assistReply?.message || 'Internal Server Error.'}`, status: 'Error', code: 500 });
                }

                return resp.status(200).json({ content: assistReply.content[0].message.content, status: 'Success', code: 200 })
            }

            else {
                return resp.status(400).json({ message: 'Bad request.', status: 'Error', code: 400 });
            }
        }
    }
)







// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



