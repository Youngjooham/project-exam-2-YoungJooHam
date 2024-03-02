import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
      <p>&copy; {new Date().getFullYear()} Holidaze | Young Joo Ham </p>
    </footer>
  );
};

export default Footer;