# Chatbot Project

This project is a chatbot application that allows users to ask dynamic questions through the OpenAI API. The application consists of a frontend built with React and a backend developed with ExpressJS.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features

- Generate dynamic questions based on user responses.
- Store user sessions and answers in a MongoDB database.
- An interactive chat experience with a user-friendly interface.

## Installation

### Requirements

- Node.js (v14 and above)
- npm (Node Package Manager)
- MongoDB (local or cloud-based)

### Cloning the Project

```bash
git clone https://github.com/username/chatbot.git
cd chatbot
```

### Backend Setup

1. **Navigate to the backend folder:**

   ```bash
   cd backend
   ```

2. **Install the required dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file and set the required variables:**

   ```plaintext
   MONGO_URI="MongoDB connection string"
   PORT=5001
   OPENAI_API_KEY="OPENAI_API_KEY"
   ```

4. **Start the backend:**

   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to the frontend folder:**

   ```bash
   cd ../frontend
   ```

2. **Install the required dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file and set the required variable:**

   ```plaintext
   REACT_APP_API_URL="http://localhost:5001/api"
   ```

4. **Start the frontend:**

   ```bash
   npm start
   ```

## Usage

1. After starting the application, go to `http://localhost:3000` in your browser.
2. Interact with the chatbot and receive answers to your questions.

## Technologies

- **Frontend:** React
- **Backend:** ExpressJS
- **Database:** MongoDB
- **API:** OpenAI API

## Contributing

If you would like to contribute, please create a pull request or report any issues.

