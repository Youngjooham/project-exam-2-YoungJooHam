import React, { useState, useEffect } from 'react';
import { fetchVenuesByProfile } from '../services/venueManagerService';
import UpdateAvatar from '../components/UserProfile/UpdateAvatar';
import '../css/Dashboard.css';
import { BASE_URL } from '../constants/api.js';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState('https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const authToken = localStorage.getItem('authToken');
      const name = localStorage.getItem('name');
      const response = await fetch(`${BASE_URL}profiles/${name}/?_bookings=true`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    
      if (response.ok) {
        const data = await response.json();
        if (data.bookings && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else if (Array.isArray(data)) {
          setBookings(data);
        } else {
          console.error('Unexpected data structure for bookings');
        }

        if (data.avatar) {
          setAvatarUrl(data.avatar);
        }
      } else {
        console.error('Failed to fetch bookings');
      }
    };

    const fetchVenues = async () => {
      const name = localStorage.getItem('name');
      try {
        const venues = await fetchVenuesByProfile(name);
        setVenues(venues);
      } catch (error) {
        console.error('Failed to fetch venues', error);
      }
    };

    fetchBookings();
    fetchVenues();
  }, []);

  const fetchUserData = async () => {
    const name = localStorage.getItem('name');
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}profiles/${name}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setAvatarUrl(data.avatar);
    } else {
      console.error('Failed to fetch user data');
    }
  };

  const deleteVenue = async (id) => {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}venues/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
    }
  });

  if (response.status === 204) {
    setVenues(venues.filter(venue => venue.id !== id));
  } else {
    alert('Failed to delete venue');
  }
};

const goToBooking = (id) => {
  window.location.href = `/bookings/${id}`;
};

const goToVenue = (id) => {
  window.location.href = `/manage-venue/${id}`;
};

const deleteVenueWithConfirmation = async (id) => {
  if (window.confirm('Are you sure you want to delete this venue?')) {
    try {
      await deleteVenue(id);
      window.alert('Venue deleted successfully');
    } catch (error) {
      console.error('Failed to delete venue', error);
    }
  }
};

return (
  <div className="container mt-5">
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Your Profile</h1>
      <img className="rounded-circle" src={avatarUrl} alt="User avatar" style={{width: "200px", height: "200px", objectFit: "cover"}} /> 
      <button onClick={() => setIsEditingAvatar(!isEditingAvatar)}>Edit Avatar</button>
    </div>
    {isEditingAvatar && <UpdateAvatar onAvatarUpdated={fetchUserData} />}      

    <div className="row">
    <div className="col-lg-6" style={{ marginTop: '50px' }}>
      {bookings.length > 0 && <h2>Upcoming bookings</h2>}
        {bookings.map(booking => (
          <div key={booking.id} className="mb-4">
            <div className="card h-100 booking-card">
              <div className="card-body">
                <h2 className="card-title"> {booking.venue.name}</h2>
                <p className="card-text">Date From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                <p className="card-text">Date To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                <p className="card-text">Guests: {booking.guests}</p>
                {Array(booking.venue.rating).fill().map((_, i) => <span key={i}>⭐</span>)}
              </div>
              <div className="image-container">
                {booking.venue.media && <img className="card-img-bottom booking-image" src={booking.venue.media} alt="Booking" />}
                <button className="go-to-booking" onClick={() => goToBooking(booking.id)}>Manage Booking</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="col-lg-6" style={{ marginTop: '50px' }}>
      {venues.length > 0 && <h2>Venues You Manage</h2>}
        {venues.map(venue => (
          <div key={venue.id} className="mb-4">
            <div className="card h-100 venue-card">
              <div className="card-body">
                <h2 className="card-title"> {venue.name}</h2>
                <p className="card-text">NOK {venue.price}/ per night</p>
                <p className="card-text">Max Guests: {venue.maxGuests}</p>
                <p className="card-text">Wifi: {venue.meta.wifi ? 'Yes' : 'No'}</p>
                <p className="card-text">Parking: {venue.meta.parking ? 'Yes' : 'No'}</p>
                <p className="card-text">Breakfast: {venue.meta.breakfast ? 'Yes' : 'No'}</p>
                <p className="card-text">Pets: {venue.meta.pets ? 'Yes' : 'No'}</p>

                <div className="venue-container">
                  {venue.media && <img className="card-img-bottom venue-image" src={venue.media} alt="Venue" />}
                  <button className="manage-venue-button" onClick={() => goToVenue(venue.id)}>Manage Venue</button>
                </div>
                <button onClick={() => deleteVenueWithConfirmation(venue.id)}>Delete Venue</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default Dashboard;