const Session = require('../models/Session');

const createSession = async (req, res) => {
    const { sessionId } = req.body;
    const newSession = new Session({ sessionId });
    try {
        await newSession.save();
        res.status(201).json(newSession);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const endSession = async (req, res) => {
    const { sessionId } = req.params;

    try {
        const session = await Session.findOneAndUpdate(
            { sessionId },
            { endTime: Date.now() },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({ message: 'Session not found.' });
        }
        res.json(session);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createSession,
    endSession,
};
