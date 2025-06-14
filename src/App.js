import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import CodingDebugQuiz from './components/CodingDebugQuiz';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/code-debug-quiz" element={<CodingDebugQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;
