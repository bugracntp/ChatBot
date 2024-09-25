const verifySession = (req, res, next) => {
    const { sessionId } = req.body;
    if (!sessionId) {
        return res.status(400).json({ message: 'Session ID is required' });
    }
    next();
};

module.exports = {
    verifySession,
};
