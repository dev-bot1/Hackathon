import React from 'react';

const MetricsPage = () => {
  // Inline CSS for the component
  const styles = {
    metricsPage: {
      padding: '20px',
      background: 'linear-gradient(135deg, #b1f7b1, #a3e8a3)',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: '20px auto',
    },
    heading: {
      color: '#007DB8',
      fontSize: '24px',
      marginBottom: '10px',
    },
    paragraph: {
      fontSize: '16px',
      lineHeight: '1.5',
      marginBottom: '15px',
    },
    list: {
      listStyleType: 'disc',
      marginLeft: '20px',
      marginBottom: '15px',
    },
    listItem: {
      fontSize: '16px',
      marginBottom: '5px',
    },
    link: {
      color: '#007DB8',
      textDecoration: 'none',
    },
    closeButton: {
      backgroundColor: '#007DB8',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.metricsPage}>
      <h2 style={styles.heading}>How our metrics are calculated</h2>
      <p style={styles.paragraph}>On an average, 1 tree has 5 bird nests. So on saving 1 tree we are saving 5 birds.</p>
      <p style={styles.paragraph}>CO2 emitted by different vehicles per km:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Petrol Bike: 21g</li>
        <li style={styles.listItem}>Electric bike: 13g</li>
        <li style={styles.listItem}>Petrol car: 143g</li>
        <li style={styles.listItem}>Diesel car: 164g</li>
        <li style={styles.listItem}>Electric car: 0g</li>
        <li style={styles.listItem}>Hybrid car: 126g</li>
      </ul>
      <p style={styles.paragraph}>So if a person car pools and takes 4 people with them they save around 462g of CO2 emission per km.</p>
      <p style={styles.paragraph}>So you are not the only one going home, birds are also going home.</p>
      <p style={styles.paragraph}>Referenced from:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Bike: <a href="https://thrustcarbon.com" style={styles.link}>thrustcarbon.com</a></li>
        <li style={styles.listItem}>Cars: <a href="https://www.ageco.co.uk" style={styles.link}>ageco.co.uk</a></li>
      </ul>
    </div>
  );
};

export default MetricsPage;
