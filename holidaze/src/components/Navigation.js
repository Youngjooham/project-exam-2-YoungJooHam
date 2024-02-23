// src/components/Navigation.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const isvenueManager = localStorage.getItem('isvenueManager') === 'true';

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        // Other links...
        {isvenueManager && (
          <li><Link to="/create-venue">Create Venue</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
