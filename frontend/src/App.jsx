import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Make sure path is correct
// import LoginPage from './components/LoginPage';     // Create this if not yet done
import Board from './pages/Board';             // Existing Board

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/board" element={<Board />} />
      </Routes>
    </Router>
  );
};

export default App;
