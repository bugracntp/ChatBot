const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
        default: null,
    },
    questionsAndAnswers: [
        {
            question: {
                type: String,
                required: true,
            },
            answer: {
                type: String,
                required: true,
            },
        },
    ],
});
// Model oluşturma
const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
