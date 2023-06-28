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
const { KEYS } = require("./keys");
//const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//     logger.info("Hello logs!", { structuredData: true });
//     response.send("Hello from Firebase!");
// });

setGlobalOptions({ maxInstances: 10 });

exports.summaryCreate = onRequest(
    { cors: ["https://buildcv.app", "localhost:3000"] },
    async (req, resp) => {

        switch (req.method) {
            case 'POST':

                const API_KEY = KEYS.openai;
                console.log(API_KEY);
                const body = req.body;

                const options = {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [{ role: 'user', content: body.content }],
                        max_tokens: 100
                    })
                }

                try {

                    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
                    const data = await response.json();

                    resp.status(200).json({ content: data.choices[0].message.content });

                } catch (error) {
                    console.error(error);
                } finally {
                    break;
                }

            default:
                resp.status(400).json({ error: 'Bad request..' });
                break;
        }
    }
)

exports.showKey = onRequest((req, resp) => {
    const API_KEY = KEYS.openai;
    try {
        if (API_KEY) {
            resp.status(200).json({ key: API_KEY })
        } else {
            resp.status(200).json({ key: 'no key' })
        }
    }
    catch (error) {
        resp.status(200).json({ error: error })
    }
})