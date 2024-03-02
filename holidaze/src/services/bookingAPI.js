const API_URL = 'https://api.noroff.dev/api/v1/holidaze/';

export const createBooking = async (dateFrom, dateTo, guests, venueId) => {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        dateFrom,
        dateTo,
        guests,
        venueId,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  };