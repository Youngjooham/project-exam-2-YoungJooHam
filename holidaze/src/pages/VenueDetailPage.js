import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VenueCalendar from '../components/VenueCalendar'; 
import { createBooking } from '../services/bookingAPI.js';
import '../css/Dashboard.css';

const VenueDetailPage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [guests, setGuests] = useState(0);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true`);
        if (!response.ok) throw new Error('Venue not found');
        const data = await response.json();
        setVenue(data);
      } catch (error) {
        console.error('Error fetching venue:', error);
      }
    };

    fetchVenue();
  }, [id]);

  const handleBooking = async (event) => {
    event.preventDefault();
    if (!dateFrom || !dateTo) {
      alert('Please select a date range from the calendar.');
      return;
    }
    try {
      const data = await createBooking(dateFrom, dateTo, Number(guests), id);
      console.log(data);
      alert('Booking created successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating booking. Please try again.');
    }
  };

  if (!venue) return <div>Loading...</div>;

  return (
    <div>
      <h1>{venue.name}</h1>
      <p>{venue.description}</p>
      <h2>{venue.price}</h2>
      <p>Max Guests: {venue.maxGuests}</p>
      <p>Rating: {venue.rating}</p>
      <p>Wifi: {venue.meta.wifi ? 'Available' : 'Not Available'}</p>
      <p>Parking: {venue.meta.parking ? 'Available' : 'Not Available'}</p>
      <p>Breakfast: {venue.meta.breakfast ? 'Available' : 'Not Available'}</p>
      <p>Pets: {venue.meta.pets ? 'Allowed' : 'Not Allowed'}</p>
      {venue.media && venue.media[0] && (
        <img 
        src={venue.media[0]} 
        alt={venue.name} 
        style={{ width: '20%', height: 'auto' }} />
      )}
      <VenueCalendar bookings={venue.bookings} onDateChange={({ dateFrom, dateTo }) => {
        setDateFrom(dateFrom ? dateFrom.toISOString().split('T')[0] : '');
        setDateTo(dateTo ? dateTo.toISOString().split('T')[0] : '');
      }}/>
      <input type="number" value={guests} onChange={e => setGuests(e.target.value)} required />
      <button onClick={handleBooking}>Book</button>
    </div>
  );
};

export default VenueDetailPage;