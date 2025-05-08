const { PROMPTS } = require("./promptsByRoles");  // custom prompts to use with GPT-model

const GPT_MODELS = {
    default: 'gpt-4.1-nano',
    gpt_4_1: 'gpt-4.1',
    gpt_4o_mini: 'gpt-4o-mini',
    audio: 'gpt-4o-audio-preview',

};

async function createCompletions(openai, data, variant = null,) {
    let messagesArray = null;
    let interviewSystemPrompt = null;

    if (variant === 'generateSummary') {
        messagesArray = [{ ...PROMPTS.generateSummary(data) }];
    }
    else if (variant === 'generateSkills' && (data && data !== '')) {
        messagesArray = [{ ...PROMPTS.generateSkills(data) }]
    }
    else if (variant == 'generateCoverLetter') {
        messagesArray = [{ ...PROMPTS.generateCoverLetter(data) }]
    }
    else if (variant == 'generateExp') {
        messagesArray = [{ ...PROMPTS.generateExp(data) }]
    }
    else if (variant == 'interview') {

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
            max_completion_tokens: 2048,
            n: n_param,
            messages: messagesArray,
            modalities: model == GPT_MODELS.audio ? ['text', 'audio'] : ['text'],
            response_format: data.jsonFormat ? { type: 'json_object' } : { type: 'text' },
        });

        if (completion && data.firstRequest && variant == 'interview') {
            return ({
                status: 'Success',
                success: true,
                content: completion.choices,
                systemPrompt: interviewSystemPrompt.content // to return system prompt
            })
        }

        return ({ status: 'Success', content: completion.choices, success: true })

    } catch (error) {
        return { status: 'Error', message: error.message, success: false }
    }
}


module.exports = { createCompletions, };
