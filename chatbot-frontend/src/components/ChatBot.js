import React, { useState, useEffect, useRef } from 'react';
import {
    createSession,
    saveAnswers,
    setEndTime,
    generateQuestion
} from '../api/chatbotApi';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [sessionId, setSessionId] = useState(null);
    const [ , setAnswers] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const initializeChat = async () => {
            try {
                const sessionData = await createSession();
                setSessionId(sessionData.sessionId);
                // İlk soruyu oluştur
                const firstQuestion = await generateQuestion("Start the conversation with topics" );
                setCurrentQuestion(firstQuestion);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: firstQuestion }
                ]);
            } catch (error) {
                console.error('An error occurred :', error);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: 'An error occurred, please try again later.' }
                ]);
            }
        };

        initializeChat();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'user', text: userInput }
        ]);

        const answerObject = { question: currentQuestion, answer: userInput };
        setAnswers(prevAnswers => [...prevAnswers, answerObject]);
        setUserInput('');

        try {
            const newQuestion = await generateQuestion(userInput, messages);
            if (newQuestion) {
                setCurrentQuestion(newQuestion);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: newQuestion }
                ]);

                // Cevapları API'ye kaydet
                await saveAnswers(sessionId, answerObject);
                await setEndTime(sessionId);
            } else {
                console.error('New question could not be retrieved.');
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: 'New question could not be retrieved.' }
                ]);
            }
        } catch (error) {
            console.error('Error while creating a new question.:', error);
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'bot', text: 'An error occurred while creating a new question.' }
            ]);
        }
    };

    return (
        <div className="chat-container">
            <div className="message-list">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        <p>{message.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            {currentQuestion ? (
                <form onSubmit={handleSubmit} className="input-form">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        required
                        placeholder="Please write your answer..."
                    />
                    <button type="submit">
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </form>
            ) : (
                <div className="chat-end">
                    <p>Waiting...</p>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
