import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ScheduleRide from "./pages/ScheduleRide";
import JoinRide from "./pages/JoinRide";
import LoginForm from "./components/LoginForm";
import MetricsPage from "./pages/MetricsPage"; // Import MetricsPage component
import Header from './components/Header'; // Import Header component
import Footer from './components/Footer'; // Import Footer component

const App = () => {
  return (
    <Router>
      <Header /> {/* Add Header component */}
      <div style={{ minHeight: 'calc(100vh - 100px)' }}> {/* Adjust height to accommodate footer */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/schedule-ride-login"
            element={<LoginForm redirectPath="/schedule-ride" />}
          />
          <Route
            path="/join-ride-login"
            element={<LoginForm redirectPath="/join-ride" />}
          />
          <Route path="/schedule-ride" element={<ScheduleRide />} />
          <Route path="/join-ride" element={<JoinRide />} />
          {/* Route for MetricsPage */}
          <Route path="/metrics" element={<MetricsPage />} />
        </Routes>
      </div>
      <Footer /> {/* Add Footer component */}
    </Router>
  );
};

export default App;
