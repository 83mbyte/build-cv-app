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
const { PRIVATE } = require("./keys");

setGlobalOptions({ maxInstances: 10 });

exports.summaryCreate = onRequest(
    { cors: [PRIVATE.URLS.domain] }, //put your domain in case of need OR remove/disable CORS
    async (req, resp) => {

        switch (req.method) {
            case 'POST':

                const API_KEY = PRIVATE.KEYS.openai; //put YOUR openai KEY to make calls to https://api.openai.com //

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

                    if (data) {
                        resp.status(200).json({ content: data.choices[0].message.content });
                    } else {
                        resp.status(200).json({ content: 'Unexpected error.' });
                    }

                } catch (error) {
                    console.error(error);
                    resp.status(500).json({ content: 'Internal server error' });
                } finally {
                    break;
                }

            default:
                resp.status(400).json({ error: 'Bad request..' });
                break;
        }
    }
)