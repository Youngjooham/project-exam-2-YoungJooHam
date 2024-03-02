import React, { useState, useEffect } from 'react';

const UserBookings = ({ profileName }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${profileName}/bookings`)
      .then(response => response.json())
      .then(data => {
        setBookings(data);
      })
      .catch(error => {
        console.error('Error fetching user bookings', error);
      });
  }, [profileName]);

  return (
    <div>
      <h1>Your Bookings</h1>
      {bookings.map(booking => (
        <div key={booking.id}>
          <p>{booking.dateFrom} - {booking.dateTo}</p>
          <p>Guests: {booking.guests}</p>
        </div>
      ))}
    </div>
  );
};

export default UserBookings;