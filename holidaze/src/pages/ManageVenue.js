// ManageVenue.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateVenue, getBookingsForVenue } from '../services/venueManagerService'; 

const ManageVenue = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [successMessage] = useState(''); 
  const [, setBookings] = useState([]);
  useEffect(() => {
    fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`)
      .then(response => response.json())
      .then(data => setVenue(data))
      .catch(error => console.error('Error:', error));

    // Fetch the bookings for the venue
    getBookingsForVenue(id)
      .then(data => setBookings(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  if (!venue) {
    return <div>Loading...</div>;
  }

  const handleNameChange = (event) => {
    setVenue({...venue, name: event.target.value });
  }

  const handleDescriptionChange = (event) => {
    setVenue({...venue, description: event.target.value });
  }

  const handleGuestsChange = (event) => {
    setVenue({...venue, maxGuests: parseInt(event.target.value, 10) });
  }
  
  const handlePriceChange = (event) => {
    setVenue({...venue, price: parseFloat(event.target.value) });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedVenue = await updateVenue(id, venue);
      setVenue(updatedVenue);
      window.alert('Venue updated successfully'); // Show the alert
    } catch (error) {
      console.error('Error', error);
    }
  }

    
  return (
    <div>
      <div className="card mx-auto mt-5" style={{width: '38rem'}}>
      {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>} {/* Add this line */}
        <img src={venue.media[0]} className="card-img-top" alt={venue.name} />
        <div className="card-body">
          <h5 className="card-title">Venue Details</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Name:</strong> {venue.name}</li>
          <li className="list-group-item"><strong>Description:</strong> {venue.description}</li>
          <li className="list-group-item"><strong>Max Guests:</strong> {venue.maxGuests}</li>
          <li className="list-group-item"><strong>Rating:</strong> {venue.rating}</li>
          <li className="list-group-item"><strong>Price:</strong> {venue.price}</li>
          <li className="list-group-item"><strong>Wifi:</strong> {venue.meta.wifi ? 'Yes' : 'No'}</li>
          <li className="list-group-item"><strong>Parking:</strong> {venue.meta.parking ? 'Yes' : 'No'}</li>
          <li className="list-group-item"><strong>Breakfast:</strong> {venue.meta.breakfast ? 'Yes' : 'No'}</li>
          <li className="list-group-item"><strong>Pets:</strong> {venue.meta.pets ? 'Yes' : 'No'}</li>
        </ul>
      </div>
      <div className="card mx-auto mt-5" style={{width: '38rem'}}>
        <div className="card-body">
          <h5 className="card-title">Update Venue Details</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={venue.name} onChange={handleNameChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="description" value={venue.description} onChange={handleDescriptionChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="guests" className="form-label">Max Guests</label>
              <input type="number" className="form-control" id="guests" value={venue.maxGuests} onChange={handleGuestsChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="number" className="form-control" id="price" value={venue.price} onChange={handlePriceChange} />
            </div>
            <button type="submit" className="btn btn-primary">Update Venue</button>
          </form>
        </div>
      </div>
<div className="card mx-auto mt-5" style={{width: '38rem'}}>
  <div className="card-body">
  <h5 className="text-center">Venue Bookings</h5>
    {venue && venue.bookings && venue.bookings.length > 0 ? (
      <ul className="list-group list-group-flush">
        {venue.bookings.map((booking, index) => (
          <li key={index} className="list-group-item">
            <div className="form-group">
                <label>Booking ID:</label>
                <p className="form-control">{booking.id}</p>
            </div>

            <div className="form-group">
                <label>Date From:</label>
                <p className="form-control">{booking.dateFrom}</p>
            </div>

            <div className="form-group">
                <label>Date To:</label>
                <p className="form-control">{booking.dateTo}</p>
            </div>

            <div className="form-group">
                <label>Guests:</label>
                <p className="form-control">{booking.guests}</p>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>No bookings yet.</p>
    )}
  </div>
</div>
  </div>
  );
};

export default ManageVenue;

