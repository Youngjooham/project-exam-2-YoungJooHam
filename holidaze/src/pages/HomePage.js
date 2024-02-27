import React, { useEffect, useState } from 'react';
import { fetchAllVenues } from '../services/venueService';
import VenueItem from '../components/VenueItem';

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
    <div>
      <h1>Welcome to Our Venue Booking Site</h1>
      <input
        type="text"
        placeholder="Search for venues..."
        onChange={handleSearchChange}
        style={{ padding: '10px', margin: '10px 0', width: '100%', boxSizing: 'border-box' }}
      />
      <div>
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
