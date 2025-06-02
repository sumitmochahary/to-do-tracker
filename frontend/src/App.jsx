import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Make sure path is correct
// import LoginPage from './components/LoginPage';     // Create this if not yet done
import Board from './pages/Board';             // Existing Board
import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {

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
      <AppRoutes />
    </Router>
  )
}

export default App;
