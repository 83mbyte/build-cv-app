const { PROMPTS } = require("./promptsByRoles");  // custom prompts to use with GPT-model

const GPT_MODELS = {
    default: 'gpt-4o-mini',
    gpt_4: 'gpt-4-turbo',
    gpt_4o: 'gpt-4o',
    gpt_4o_mini: 'gpt-4o-mini',

};

async function createCompletions(openai, data, variant = null,) {
    let interviewSystemPrompt = null;
    let messagesArray = null;

    if (variant === 'aggression') {
        messagesArray = [{ ...PROMPTS.aggression }, { role: 'user', content: data }];
    }
    else if (variant === 'humor') {
        messagesArray = [{ ...PROMPTS.humor }, { role: 'user', content: data }]
    }
    else if (variant === 'summary') {
        messagesArray = [{ ...PROMPTS.summary }, { role: 'user', content: data }]
    }
    else if (variant === 'professional') {
        messagesArray = [{ ...PROMPTS.professional }, { role: 'user', content: data }]
    }
    else if (variant === 'adviser' && (data && data !== '')) {
        messagesArray = [{ ...PROMPTS.adviser(data) }]
    }
    else if (variant === 'interview' && (data)) {

        if (data.firstRequest) {
            interviewSystemPrompt = PROMPTS.interviewProcess({ position: data.position, category: data.category, language: data.language, difficulty: data.difficulty, totalQuestions: data.totalQuestions });
            messagesArray = [interviewSystemPrompt]
        }
        if (data.messages) {
            messagesArray = [...data.messages]
        }
        if (data.isFinal && data.messages) {
            interviewSystemPrompt = PROMPTS.interviewConclusion({ position: data.position, category: data.category, language: data.language });
            messagesArray = [interviewSystemPrompt, ...data.messages]
        }
    }
    else {
        messagesArray = [{ role: 'user', content: data }];
    }


    let model = GPT_MODELS.default;

    let presence_p = 0;
    let frequency_p = 0;
    let temperature = 1;
    let n_param = 1;

    try {
        const completion = await openai.chat.completions.create({
            model,
            temperature,
            presence_penalty: presence_p,
            frequency_penalty: frequency_p,
            max_tokens: 1500,
            n: n_param,
            messages: messagesArray,
            response_format: data.jsonFormat ? { type: 'json_object' } : { type: 'text' },

            // response_format: !outputFormat ? { type: 'text' } : {
            //     type: 'json_schema',
            //     json_schema: {
            //         name: 'interview_analysis',
            //         schema: {
            //             type: 'object',
            //             properties: {
            //                 greetings: {
            //                     type: 'string',
            //                     description: `Generate a thankful message about the complete interview.`
            //                 },
            //                 analysis: {
            //                     type: 'string',
            //                     description: `Provide an analysis the candidate's answers to your questions.`
            //                 },
            //                 conclusion: {
            //                     type: 'string',
            //                     description: `Provide a conclusion about the candidate's readiness for the position.`
            //                 },
            //                 recommendations: {
            //                     type: 'string',
            //                     description: `Provide some recommendations what and where the candidate can read about missed or incorrect answers.`
            //                 },
            //                 statistics: {
            //                     type: 'object',
            //                     properties: {
            //                         correct: {
            //                             type: 'string',
            //                             description: `Percentage (%) of the candidate's correct answers`
            //                         },
            //                         incorrect: {
            //                             type: 'string',
            //                             description: `Percentage (%) of the candidate's incorrect answers`
            //                         }
            //                     }
            //                 }

            //             }
            //         }
            //     },
            //     strict: true
            // }

        });

        if (completion && data.firstRequest && variant == 'interview') {
            return ({
                status: 'Success',
                content: completion.choices,
                systemPrompt: interviewSystemPrompt.content // to return system prompt
            })
        }
        return ({ status: 'Success', content: completion.choices })

    } catch (error) {
        return { status: 'Error', message: error.message }
    }
}


module.exports = { createCompletions, };
