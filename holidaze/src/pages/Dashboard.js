import React, { useState, useEffect } from 'react';
import { fetchVenuesByProfile } from '../services/venueManagerService';
import UpdateAvatar from '../components/UserProfile/UpdateAvatar';
import '../css/Dashboard.css';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState('https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const authToken = localStorage.getItem('authToken');
      const name = localStorage.getItem('name');
      const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/?_bookings=true`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log('Bookings data:', data); // Log the data to see its structure
        // If the data is an object with a 'bookings' key
        if (data.bookings && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else if (Array.isArray(data)) { // If the data itself is an array
          setBookings(data);
        } else {
          console.error('Unexpected data structure for bookings');
        }

        // If the data has an 'avatar' key, set the avatar URL
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
    const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}`, {
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
  
  const fetchVenues = async () => {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch('https://api.noroff.dev/api/v1/holidaze/venues', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setVenues(data);
    } else {
      console.error('Failed to fetch venues');
    }
  };

  // Add this function inside your Dashboard component
  const deleteVenue = async (id) => {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
    }
  });

  if (response.status === 204) {
    alert('Venue deleted successfully');
    // Re-fetch the venues after a venue is deleted
    fetchVenues();
  } else {
    alert('Failed to delete venue');
  }
};

const goToBooking = (id) => {
  window.location.href = `/bookings/${id}`;
};

  return (
    <div className="container mt-5">
      <img className="rounded-circle" src={avatarUrl} alt="User avatar" style={{width: "200px", height: "200px", objectFit: "cover"}} />      <button onClick={() => setIsEditingAvatar(!isEditingAvatar)}>Edit Avatar</button>
      <h1> Dashboard </h1>
      {isEditingAvatar && <UpdateAvatar onAvatarUpdated={fetchUserData} />}      
      <div className="row">
        {bookings.map(booking => (
          <div key={booking.id} className="col-lg-4 mb-4">
            <div className="card h-100 booking-card">
              <div className="card-body">
                <h2 className="card-title">Venue Name: {booking.venue.name}</h2>
                <p className="card-text">Date From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                <p className="card-text">Date To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                <p className="card-text">Guests: {booking.guests}</p>
                <p className="card-text">Rating: {booking.venue.rating}</p>
              </div>
              {booking.venue.media && <img className="card-img-bottom" src={booking.venue.media} alt="Booking" />}
              <button className="go-to-booking" onClick={() => goToBooking(booking.id)}>Go to Booking</button>
            </div>
          </div>
        ))}
        {venues.map(venue => (
          <div key={venue.id} className="col-lg-4 mb-4">
            <div className="card h-100 venue-card">
              <div className="card-body">
                <h2 className="card-title">Venue Name: {venue.name}</h2>
                <p className="card-text">Rating: {venue.rating}</p>
                <p className="card-text">Guests: {venue.maxGuests}</p>
                <button onClick={() => deleteVenue(venue.id)}>Delete</button>
              </div>
              {venue.media && <img className="card-img-bottom" src={venue.media} alt="Venue" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;