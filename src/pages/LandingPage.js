import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Define paths to your images in the public folder
  const topImages = [
    '/images/bird.png',
    '/images/bird.png',
    '/images/bird.png',
    '/images/bird.png',
    '/images/bird.png',
  ];

  // Define paths to your images in the public folder for bottom images
  const bottomImages = [
    '/images/cut tree.png',
    '/images/cut tree.png',
    '/images/cut tree.png',
    '/images/cut tree.png',
    '/images/cut tree.png',
  ];

  const buttonStyle = {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '5px',
    background: 'linear-gradient(to right, #007bff, #0056b3)', // Blue gradient
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background 0.5s, transform 0.3s, box-shadow 0.3s',
    outline: 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  const buttonHoverStyle = {
    background: 'linear-gradient(to right, #0056b3, #007bff)', // Reversed gradient
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  };

  const sectionStyle = {
    margin: '20px 0',
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#333',
    margin: '20px 0',
  };

  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    overflowX: 'auto', // Allows horizontal scroll if needed
  };

  const imageStyle = {
    width: '150px', // Adjust width as needed
    height: 'auto',
    margin: '0 5px', // Add some space between images
  };

  return (
    <div className="landing-page" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Display top images */}
      <section style={sectionStyle}>
        <div className="top-images" style={imageContainerStyle}>
          {topImages.map((image, index) => (
            <img key={index} src={process.env.PUBLIC_URL + image} alt={`Top Image ${index + 1}`} style={imageStyle} />
          ))}
        </div>
      </section>

      <h1 style={headingStyle}>Welcome to Ride App</h1>

      <section style={sectionStyle}>
        <div style={{ textAlign: 'center' }}>
          <Link to="/schedule-ride-login">
            <button
              style={buttonStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.background = buttonHoverStyle.background;
                e.currentTarget.style.transform = buttonHoverStyle.transform;
                e.currentTarget.style.boxShadow = buttonHoverStyle.boxShadow;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = buttonStyle.background;
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = buttonStyle.boxShadow;
              }}
            >
              Schedule a Ride
            </button>
          </Link>
          <Link to="/join-ride-login">
            <button
              style={{ ...buttonStyle, marginLeft: '10px' }} // Add margin for spacing between buttons
              onMouseOver={(e) => {
                e.currentTarget.style.background = buttonHoverStyle.background;
                e.currentTarget.style.transform = buttonHoverStyle.transform;
                e.currentTarget.style.boxShadow = buttonHoverStyle.boxShadow;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = buttonStyle.background;
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = buttonStyle.boxShadow;
              }}
            >
              Join a Ride
            </button>
          </Link>
        </div>
      </section>

      {/* Display bottom images */}
      <section style={sectionStyle}>
        <div className="bottom-images" style={imageContainerStyle}>
          {bottomImages.map((image, index) => (
            <img key={index + topImages.length} src={process.env.PUBLIC_URL + image} alt={`Bottom Image ${index + 6}`} style={imageStyle} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
