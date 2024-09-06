import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import StartPage from './components/StartPage';
import Game from './components/Game';
import Result from './components/Result';
import HomePage from './components/Homepage';

function App() {
  const [userAnswers, setUserAnswers] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<Login/>} />
        <Route path="/start" element={<StartPage/>} />
        <Route path='/game' element={<Game setUserAnswers={setUserAnswers} />}/>
        <Route path='/result' element={<Result userAnswers={userAnswers}/>}/>
      </Routes>
    </Router>
  );
}

export default App;