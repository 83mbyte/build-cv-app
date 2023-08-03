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
const { PRIVATE } = require("./keys");   // source for your API keys, Domains, etc.

setGlobalOptions({ maxInstances: 10 });

exports.summaryCreate = onRequest(

    {
        cors: [PRIVATE.URLS.domain], //put your domain(s) in case of need 
        secrets: ['AIKEY']
    },

    //{ cors: true },  // If your function should be openly available, for example if it's serving a public API or website, set the cors policy to true.
    async (req, resp) => {
        if (req.method !== 'POST') {
            resp.status(400).json({ error: 'Bad request.' });
        }
        else {

            if (req.body) {
                let apiKey = process.env.AIKEY;

                createRequest(req, resp, apiKey, variant = null, tokens = 200);
            }
            else {
                resp.status(400).json({ error: 'Bad request.' });
            }
        }
    }
)

exports.coverLetterCreate = onRequest(
    {
        cors: [PRIVATE.URLS.domain],
        secrets: ['AIKEY']
    },
    //{ cors: true },
    async (req, resp) => {
        if (req.method !== 'POST') {
            resp.status(400).send(JSON.stringify({ error: 'Bad request.' }));
        } else {

            if (req.body) {
                createRequest(req, resp, apiKey = process.env.AIKEY, variant = 'professional', tokens = 350)
            } else {
                resp.status(400).send(JSON.stringify({ error: 'Bad request.' }));
            }
        }
    }
)

exports.generateSkills = onRequest(
    {
        cors: [PRIVATE.URLS.domain],
        secrets: ['AIKEY']
    },
    //{ cors: true },
    async (req, resp) => {

        if (req.method !== 'POST') {
            resp.status(400).send(JSON.stringify({ error: 'Bad request.' }));
        } else {

            if (req.body) {
                createRequest(req, resp, apiKey = process.env.AIKEY, variant = 'adviser', tokens = 50)
            } else {
                resp.status(400).send(JSON.stringify({ error: 'Bad request.' }));
            }
        }
    }
)


const createRequest = async (req, resp, apiKey = null, variant = null, tokens = 200) => {
    //const API_KEY = PRIVATE.KEYS.openai; //put YOUR openai KEY to make calls to https://api.openai.com //

    const API_KEY = apiKey;
    const body = req.body.content;
    let messsagesArray = null;

    if (variant === 'aggression') {
        messsagesArray = [{ ...PRIVATE.PROMPTS.aggression }, { role: 'user', content: body }];
    }
    else if (variant === 'humor') {
        messsagesArray = [{ ...PRIVATE.PROMPTS.humor }, { role: 'user', content: body }]
    }
    else if (variant === 'professional') {
        messsagesArray = [{ ...PRIVATE.PROMPTS.professional }, { role: 'user', content: body }]
    } else if (variant === 'adviser' && (body && body !== '')) {
        messsagesArray = [{ ...PRIVATE.PROMPTS.adviser(body) }]
    }
    else {
        messsagesArray = [{ role: 'user', content: body }];
    }


    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messsagesArray,
            max_tokens: tokens
        })
    }

    try {
        //resp.status(200).send(JSON.stringify({ content: apiKey }));

        // resp.status(200).send({ content: `"ABC"|"123"|"M93"` })   // just temporal data .... 

        if (!API_KEY) {
            throw new Error('Warning! No KEY provided.')
        } else {
            const response = await fetch(PRIVATE.URLS.openai, options);
            const data = await response.json();

            if (data) {
                resp.status(200).send(JSON.stringify({ content: data.choices[0].message.content }));
            } else {
                resp.status(200).send(JSON.stringify({ content: 'Unexpected error.' }));
            }
        }


    } catch (error) {
        resp.status(500).send(JSON.stringify({ content: 'Internal server error.' }));
    }

}