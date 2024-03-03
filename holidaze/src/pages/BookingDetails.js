import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function BookingDetails() {
  const { id } = useParams(); // Get the booking ID from the URL
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Retrieve the token from local storage

    fetch(`https://api.noroff.dev/api/v1/holidaze/bookings/${id}?_venue=true`, {
      headers: {
        'Authorization': `Bearer ${authToken}`, // Use the token in the Authorization header
      },
    })
      .then(response => response.json())
      .then(data => {
        setBooking(data);
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-center mt-5 mb-4">Booking Details</h1>
      <div className="container">
        <div className="card mb-3">
          {booking.venue.media && booking.venue.media.length > 0 && (
            <img src={booking.venue.media[0]} alt={booking.venue.name} className="card-img-top" />
          )}
          <div className="card-body">
            <h5 className="card-title"><Link to={`/venues/${booking.venue.id}`}>{booking.venue.name}</Link></h5>
            {Array(booking.venue.rating).fill().map((_, i) => <span key={i}>⭐</span>)}
            <p className="card-text"><strong>Description:</strong> {booking.venue.description}</p>
            <p className="card-text"><strong>Date:</strong> {booking.dateFrom} to {booking.dateTo}</p>
            <p className="card-text"><strong>Guests:</strong> {booking.guests}</p>
            <p className="card-text"><strong>Price:</strong> NOK {booking.venue.price} / Per night</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Wifi: {booking.venue.meta.wifi ? 'Yes' : 'No'}</li>
              <li className="list-group-item">Parking: {booking.venue.meta.parking ? 'Yes' : 'No'}</li>
              <li className="list-group-item">Breakfast: {booking.venue.meta.breakfast ? 'Yes' : 'No'}</li>
              <li className="list-group-item">Pets: {booking.venue.meta.pets ? 'Yes' : 'No'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
