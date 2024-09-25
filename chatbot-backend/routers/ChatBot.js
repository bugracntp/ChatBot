const express = require('express');
const {
    getQuestions,
    initialize,
    createQuestion,
    saveAnswers,
} = require('../controllers/questionController');

const {
    createSession,
    endSession,
} = require('../controllers/sessionController');

const { verifySession } = require('../middlewares/sessionMiddleware');

const router = express.Router();

router.get('/questions', getQuestions);

router.post('/questionsOpenAI', createQuestion);

router.post('/initialize', initialize);

router.post('/sessions', verifySession, createSession);

router.post('/sessions/:sessionId/answers', saveAnswers);

router.put('/sessions/:sessionId/end', endSession);

module.exports = router;
