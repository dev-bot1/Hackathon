import React from 'react';
import { Link } from 'react-router-dom';
 
const LandingPage = () => {
  return (
<div className="landing-page">
<h1>Welcome to Ride App</h1>
<div>
<Link to="/schedule-ride-login">
<button>Schedule a Ride</button>
</Link>
<Link to="/join-ride-login">
<button>Join a Ride</button>
</Link>
</div>
</div>
  );
};
 
export default LandingPage;