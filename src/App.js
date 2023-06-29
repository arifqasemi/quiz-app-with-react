import React from 'react';
import Home from './component/Home';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizInstruction from './component/QuizInstruction';
import Quiz from './quize/quize';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instruction" element={<QuizInstruction />} />
        <Route path="/quize" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;

