import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
 
const ScheduleRide = () => {
  return (
<div className="page-container">
<Header title="Schedule a Ride" />
<Sidebar />
<main>
<p>Content for scheduling a ride goes here.</p>
</main>
<Footer />
</div>
  );
};
 
export default ScheduleRide;