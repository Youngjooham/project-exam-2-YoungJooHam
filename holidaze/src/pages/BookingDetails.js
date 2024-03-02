import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookingDetails() {
  const { id } = useParams(); // Get the booking ID from the URL
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Retrieve the token from local storage
    console.log('Auth token:', authToken); // Log the token
  
    fetch(`https://api.noroff.dev/api/v1/holidaze/bookings/${id}?_venue=true`, {
      headers: {
        'Authorization': `Bearer ${authToken}`, // Use the token in the Authorization header
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Booking data:', data); // Log the booking data
        setBooking(data);
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <h1>Booking Details</h1>
    <p>ID: {booking.id}</p>
    <p>Name: {booking.venue.name}</p>
    <p>Date: {booking.dateFrom} to {booking.dateTo}</p>
    {booking.venue.media && booking.venue.media.length > 0 && (
      <div>
        <img src={booking.venue.media[0]} alt={booking.venue.name} />
      </div>
    )}
  </div>
  );
}

export default BookingDetails;