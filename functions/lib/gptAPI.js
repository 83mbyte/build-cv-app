const { PROMPTS } = require("./promptsByRoles");  // custom prompts to use with GPT-model
const GPT_MODELS = {
    default: 'gpt-4o-mini',
    gpt_4: 'gpt-4-turbo',
    gpt_4o: 'gpt-4o',
    gpt_4o_mini: 'gpt-4o-mini',

};

async function createCompletions(openai, data, variant = null) {

    let messagesArray = null;

    if (variant === 'aggression') {
        messagesArray = [{ ...PROMPTS.aggression }, { role: 'user', content: data }];
    }
    else if (variant === 'humor') {
        messagesArray = [{ ...PROMPTS.humor }, { role: 'user', content: data }]
    }
    else if (variant === 'professional') {
        messagesArray = [{ ...PROMPTS.professional }, { role: 'user', content: data }]
    } else if (variant === 'adviser' && (data && data !== '')) {
        messagesArray = [{ ...PROMPTS.adviser(data) }]
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
            max_tokens: 1000,
            n: n_param,
            messages: messagesArray,
        });

        return ({ status: 'Success', content: completion.choices })

    } catch (error) {
        return { status: 'Error', message: error.message }
    }
}


module.exports = { createCompletions };
