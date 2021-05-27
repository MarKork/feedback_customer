import React, { useState } from 'react'
import Answer from './components/Answer'
import Login from './components/Login'
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [questions, setQuestions] = useState('')

  return (
    <div className="container">
      <h1>Palautekysely</h1>
      
      {isLoggedIn? <Answer questions={questions}/>
      :<Login setIsLoggedIn={setIsLoggedIn} setQuestions={setQuestions}/>}
    </div>
  );
}

export default App;
