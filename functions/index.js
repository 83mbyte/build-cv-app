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

                createRequest(req, resp, apiKey, variant = null, tokens = 1000);
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
                createRequest(req, resp, apiKey = process.env.AIKEY, variant = 'professional', tokens = 1000)
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
                createRequest(req, resp, apiKey = process.env.AIKEY, variant = 'adviser', tokens = 1000)
            } else {
                resp.status(400).send(JSON.stringify({ error: 'Bad request.' }));
            }
        }
    }
)

exports.adviserChat = onRequest(
    {
        cors: [PRIVATE.URLS.domain],
        secrets: ['AIKEY']
    },
    async (req, resp) => {
        // resp.set('Access-Control-Allow-Origin', '*');
        if (req.method !== 'POST') {
            resp.status(400).send(JSON.stringify({ error: 'Bad request.' }));
        } else {

            if (req.body) {
                adviserRequest(req, resp, process.env.AIKEY, 1500)
            } else {
                resp.status(400).send(JSON.stringify({ error: 'Bad request.' }));
            }
        }
    }
)


const createRequest = async (req, resp, apiKey = null, variant = null, tokens = 1000) => {
    //const API_KEY = PRIVATE.KEYS.openai; //put YOUR openai KEY to make calls to https://api.openai.com //

    const API_KEY = apiKey;
    const body = req.body.content;
    let messagesArray = null;

    if (variant === 'aggression') {
        messagesArray = [{ ...PRIVATE.PROMPTS.aggression }, { role: 'user', content: body }];
    }
    else if (variant === 'humor') {
        messagesArray = [{ ...PRIVATE.PROMPTS.humor }, { role: 'user', content: body }]
    }
    else if (variant === 'professional') {
        messagesArray = [{ ...PRIVATE.PROMPTS.professional }, { role: 'user', content: body }]
    } else if (variant === 'adviser' && (body && body !== '')) {
        messagesArray = [{ ...PRIVATE.PROMPTS.adviser(body) }]
    }
    else {
        messagesArray = [{ role: 'user', content: body }];
    }


    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: messagesArray,
            max_tokens: tokens
        })
    }
    sendRequestToAI(resp, API_KEY, options);
}

const adviserRequest = async (req, resp, apiKey, tokens = 1000,) => {


    const API_KEY = apiKey;
    let messagesArray = req.body.content;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: messagesArray,
            max_tokens: tokens,
            temperature: 1
        })
    }
    sendRequestToAI(resp, API_KEY, options);
}

const sendRequestToAI = async (resp, API_KEY, options) => {

    try {
        // dev mode
        // resp.status(200).send({ content: `"ABC"|"123"|"M93"` })   // just temporal data .... 
        //

        //Production mode
        if (!API_KEY) {
            throw new Error('Warning! No KEY provided.')
        } else {
            const response = await fetch(PRIVATE.URLS.openai, options);
            if (response.status === 200) {
                const data = await response.json();

                if (data.choices.length > 0) {
                    resp.status(200).send(JSON.stringify({ content: data.choices[0].message.content }));
                } else {
                    resp.status(200).send(JSON.stringify({ content: 'Unexpected error.' }));
                }
            } else {
                resp.status(200).send(JSON.stringify({ content: `response = ${response.status} ` }));
            }
        }
        //


    } catch (error) {
        resp.status(500).send(JSON.stringify({ content: `Internal server error - ${error}; ` }));
    }
}