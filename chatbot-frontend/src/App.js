import React from 'react';
import './App.css';
import ChatBot from './components/ChatBot';  // ChatBot bileşenini içe aktarıyoruz
import Header from './components/Header';  // Header bileşenini içe aktarıyoruz

const App = () => {
    return (
        <div className="container">
            <Header />
            <ChatBot />
        </div>
    );
};

export default App;
