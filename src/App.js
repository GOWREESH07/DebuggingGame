import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import CodingDebugQuiz from './components/CodingDebugQuiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/quiz" element={<CodingDebugQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
