// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { fetchAllVenues } from '../services/venueService';

const HomePage = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const loadVenues = async () => {
      try {
        const fetchedVenues = await fetchAllVenues();
        setVenues(fetchedVenues);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    loadVenues();
  }, []);

  return (
    <div>
    <h1>Welcome to Our Venue Booking Site</h1>
    <div>
      {venues.map(venue => (
        <div key={venue.id}>
          <h2>{venue.name}</h2>
          <p>{venue.description}</p>
          {/* Display the first media item as an image, if available */}
          {venue.media && venue.media.length > 0 && (
            <img src={venue.media[0]} alt={`Media for ${venue.name}`} style={{ maxWidth: '50%', height: 'auto' }} />)}
          <p>Price: ${venue.price}</p>
          {/* Display more venue details as needed */}
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default HomePage;
