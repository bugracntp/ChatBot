const Question = require('../models/Question');
const Session = require('../models/Session');
const { generateQuestion } = require('../services/openAI');
const fs = require('fs');


const loadQuestionsFromFile = () => {
    const data = fs.readFileSync('./data/questions.json', 'utf8');
    return JSON.parse(data);
};

const initializeQuestions = async () => {
    const questions = loadQuestionsFromFile();
    const existingQuestions = await Question.find();
    
    if (existingQuestions.length === 0) {
        await Question.insertMany(questions);
        console.log('The questions have been added to the database.');
    } else {
        console.log('The questions already exist.');
    }
};

const initialize = async (req, res) => {
    await initializeQuestions();
    res.json({ message: 'Questions are add to database or already exist' });
};

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createQuestion = async (req, res) => {
    try {
        const { prompt, messages } = req.body;
        const question = await generateQuestion(prompt, messages);
        res.json({ question });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const saveAnswers = async (req, res) => {
    const { questionsAndAnswers } = req.body; 
    try {
        const sessionId = req.params.sessionId;
        const session = await Session.findOne({ sessionId });
        if (!session) {
            return res.status(404).send('Session not found.');
        }
        session.questionsAndAnswers.push(questionsAndAnswers);
        await session.save();
        res.status(200).send('Answers saved to database.');
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).send('An error occurred while saving the responses.');
    }
};

module.exports = {
    getQuestions,
    initialize,
    createQuestion,
    saveAnswers,
};
