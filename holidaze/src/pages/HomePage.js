import React, { useEffect, useState } from 'react';
import { fetchAllVenues } from '../services/venueService';
import VenueItem from '../components/VenueItem';
import '../css/style.css';

const HomePage = () => {
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchQuery) ||
    venue.description.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="p-5">
      <h1>Welcome to Holidaze!</h1>
      <input
        type="text"
        placeholder="Search for venues..."
        onChange={handleSearchChange}
        style={{ padding: '10px', margin: '20px 0', width: '20%', boxSizing: 'border-box' }}
      />
      <div className="row">
        {filteredVenues.length > 0 ? (
          filteredVenues.map(venue => (
            <VenueItem key={venue.id} venue={venue} />
          ))
        ) : (
          <p>No venues found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
