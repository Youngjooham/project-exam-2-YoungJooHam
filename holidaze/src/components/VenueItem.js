import React from 'react';
import { Link } from 'react-router-dom';

const VenueItem = ({ venue }) => {
  return (
    <div className="venue-item" style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
      <Link to={`/venues/${venue.id}`}>
        <img src={venue.media[0]} alt={venue.name} style={{ width: '20%', height: 'auto', borderRadius: '5px' }} />
      </Link>
      <h2>
        <Link to={`/venues/${venue.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {venue.name}
        </Link>
      </h2>
      <p>{venue.description}</p>
      <p>Price: ${venue.price}</p>
      <p>Max Guests: {venue.maxGuests}</p>
    </div>
  );
};

export default VenueItem;
