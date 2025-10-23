import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import MatchesPerYearChart from './components/MatchesPerYearChart';
import TeamWinsChart from './components/TeamWinsChart';
import YearlyStats from './pages/YearlyStats';

function App() {
  return (
    <Router>
      <MyNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={
            <>
              <MatchesPerYearChart />
              <TeamWinsChart />
            </>
          } />
          <Route path="/yearly" element={<YearlyStats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
