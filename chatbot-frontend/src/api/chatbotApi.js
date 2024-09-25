const API_BASE_URL = 'http://localhost:5001/api';

// Question APIs start
export const fetchQuestions = async () => {
    const response = await fetch(`${API_BASE_URL}/questions`);
    if (!response.ok) {
        throw new Error('An error occurred while loading the questions.');
    }
    return response.json();
};

export const generateQuestion = async (prompt, messages) => {
    const response = await fetch(`${API_BASE_URL}/questionsOpenAI`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, messages })
    });
    if (!response.ok) {
        throw new Error('An error occurred while generating a dynamic question.');
    }
    const data = await response.json();
    if (!data || !data.question) {
        throw new Error('Invalid question response received.');
    }
    return data.question;
};


export const saveAnswers = async (sessionId, answers) => {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/answers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionsAndAnswers :answers }) // Cevapları dizi halinde gönder
    });
    if (!response.ok) {
        throw new Error('An error occurred while saving the responses.');
    }
};
// Question APIs end

// Session APIs
export const createSession = async () => {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: 'session-' + Date.now() })
    });
    if (!response.ok) {
        throw new Error('An error occurred while starting the session.');
    }
    return response.json();
};

export const setEndTime = async (sessionId) => {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/end`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('An error occurred while starting the session.');
    }
};
// Session APIs end
