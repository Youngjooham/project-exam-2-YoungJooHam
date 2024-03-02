import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../images/noImage.png';

const VenueItem = ({ venue }) => {
  const imageUrl = venue.media && venue.media[0] ? venue.media[0] : noImage; // Use the default image if venue.media[0] doesn't exist

  return (
    <div className="col-lg-4 mb-4">
      <div className="card h-100 venue-card">
        <Link to={`/venues/${venue.id}`}>
          <img className="img-fluid" src={imageUrl} alt={venue.name}/>
        </Link>
        <div className="card-body">
          <h2 className="card-title">
            <Link to={`/venues/${venue.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {venue.name}
            </Link>
          </h2>
          <p className="card-text">{venue.description}</p>
          <p className="card-text">Price: ${venue.price}</p>
          <p className="card-text">Max Guests: {venue.maxGuests}</p>
        </div>
      </div>
    </div>
  );
};

export default VenueItem;