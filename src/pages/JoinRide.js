import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
 
const JoinRide = () => {
  return (
<div className="page-container">
<Header title="Join a Ride" />
<Sidebar />
<main>
<p>Content for joining a ride goes here.</p>
</main>
<Footer />
</div>
  );
};
 
export default JoinRide;