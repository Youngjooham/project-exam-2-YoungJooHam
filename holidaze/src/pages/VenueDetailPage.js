import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VenueCalendar from '../components/VenueCalendar';
import { createBooking } from '../services/bookingAPI.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BASE_URL } from '../constants/api.js';

const VenueDetailPage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(`${BASE_URL}venues/${id}?_bookings=true`);
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
      console.log(data);      // handle the data here, for example:
      if (data.id) {
        alert('Booking created successfully!');
      } else {
        alert('Error creating booking. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating booking. Please try again.');
    }
  };

  if (!venue) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
        {venue.media && venue.media[0] && (
            <img 
              src={venue.media[0]} 
              alt={venue.name} 
              className="img-fluid rounded"
            />
          )}
          <h1>{venue.name}</h1>
          <p>{venue.description}</p>
          <h3>Price: ${venue.price}</h3>
          <p>Max Guests: {venue.maxGuests}</p>
          <p>Rating: {venue.rating}</p>
          <p>Wifi: {venue.meta.wifi ? 'Available' : 'Not Available'}</p>
          <p>Parking: {venue.meta.parking ? 'Available' : 'Not Available'}</p>
          <p>Breakfast: {venue.meta.breakfast ? 'Available' : 'Not Available'}</p>
          <p>Pets: {venue.meta.pets ? 'Allowed' : 'Not Allowed'}</p>
        </div>
        <div className="col-md-6">
          <VenueCalendar bookings={venue.bookings} onDateChange={({ dateFrom, dateTo }) => {
            setDateFrom(dateFrom ? dateFrom.toISOString().split('T')[0] : '');
            setDateTo(dateTo ? dateTo.toISOString().split('T')[0] : '');
          }}/>
          <form onSubmit={handleBooking} className="mt-4">
            <div className="mb-3">
              <label htmlFor="guests" className="form-label">Number of Guests:</label>
              <input 
                type="number" 
                id="guests" 
                className="form-control"
                value={guests} 
                onChange={e => setGuests(e.target.value)} 
                min="1" 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary">Book Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailPage;
