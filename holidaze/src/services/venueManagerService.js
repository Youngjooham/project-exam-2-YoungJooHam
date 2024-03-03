const BASE_URL = 'https://api.noroff.dev/api/v1/holidaze';

// Function to fetch all venues by a specific profile
export const fetchVenuesByProfile = async (name) => {
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${BASE_URL}/profiles/${name}/venues`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
  
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch venues');
    }
  };
  
  // Function to update a venue
 export const updateVenue = async (venueId, updatedData) => {
    const authToken = localStorage.getItem('authToken');
    const isVenueManager = localStorage.getItem('venueManager') === 'true'; 
  
    if (!authToken) throw new Error('No authorization token found');
    if (!isVenueManager) throw new Error('Only venue managers can update venues');
  
    const response = await fetch(`${BASE_URL}/venues/${venueId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify(updatedData),
  });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update venue');
    }
  
    return await response.json();
  };

// Function to get bookings for a venue
export const getBookingsForVenue = async (venueId) => {
  const authToken = localStorage.getItem('authToken');
  const isVenueManager = localStorage.getItem('venueManager') === 'true'; 

  if (!authToken) throw new Error('No authorization token found');
  if (!isVenueManager) throw new Error('Only venue managers can view bookings');

  const response = await fetch(`${BASE_URL}/venues/${venueId}?_owner=true&_bookings=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to get bookings');
  }

  return await response.json();
};