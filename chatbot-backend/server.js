const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const chatbotRoutes = require('./routers/ChatBot');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', chatbotRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
