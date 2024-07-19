import React from 'react';

const Footer = () => {
  const footerStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f1f1f1',
    borderTop: '1px solid #ddd',
    color: '#333',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 Ghar Aaja. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
