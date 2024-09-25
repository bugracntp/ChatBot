const Question = require('../models/Question');
const fs = require('fs');

const loadQuestionsFromFile = () => {
    const data = fs.readFileSync('./data/questions.json', 'utf8');
    return JSON.parse(data);
};

const initializeQuestions = async (req, res, next) => {
    const questions = loadQuestionsFromFile();
    
    const existingQuestions = await Question.find();
    if (existingQuestions.length === 0) {
        await Question.insertMany(questions);
        console.log('The questions have been added to the database.');
    } else {
        console.log('The questions already exist.');
    }
    
    next();
};

module.exports = {
    initializeQuestions,
};
