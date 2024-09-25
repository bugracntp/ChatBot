const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // uuid kütüphanesini ekleyelim

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    questionId: {
        type: String,
        default: uuidv4, // Otomatik olarak benzersiz bir tanımlayıcı atar
        unique: true,
    },
});

// Model oluşturma
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
