import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VenueCalendar from '../components/VenueCalendar';

const VenueDetailPage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
        if (!response.ok) throw new Error('Venue not found');
        const data = await response.json();
        setVenue(data);
      } catch (error) {
        console.error('Error fetching venue:', error);
      }
    };

    fetchVenue();
  }, [id]);

  if (!venue) return <div>Loading...</div>;

  return (
    <div>
      <h1>{venue.name}</h1>
      <p>{venue.description}</p>
      {venue.media && venue.media[0] && (
        <img src={venue.media[0]} alt={venue.name} style={{ width: '20%', height: 'auto' }} />
      )}
      <VenueCalendar />
    </div>
  );
};

export default VenueDetailPage;
