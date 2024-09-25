const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generateQuestion = async (userInput, previousMessages) => {
    try {
        const prompt = `Based on the following conversation, create a question: ${JSON.stringify(previousMessages)}. User's response: "${userInput}". Please create a question related to this response.`;
        
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 100,
            temperature: 0.3,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error while generating a question with OpenAI.', error.message);
        throw new Error('Failed to generate the question.');
    }
};

module.exports = {
    generateQuestion,
};
