import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ScheduleRide from './pages/ScheduleRide';
import JoinRide from './pages/JoinRide';
import LoginForm from './components/LoginForm';
 
const App = () => {
  return (
<Router>
<Routes>
<Route path="/" exact component={LandingPage} />
<Route path="/schedule-ride-login" render={(props) => <LoginForm {...props} redirectPath="/schedule-ride" />} />
<Route path="/join-ride-login" render={(props) => <LoginForm {...props} redirectPath="/join-ride" />} />
<Route path="/schedule-ride" component={ScheduleRide} />
<Route path="/join-ride" component={JoinRide} />
</Routes>
</Router>
  );
};
 
export default App;