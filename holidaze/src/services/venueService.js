import { BASE_URL } from '../constants/api.js';

// Code for creating a venue
export const createVenue = async (venueData) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) throw new Error('No authorization token found');
  
    const response = await fetch(`${BASE_URL}venues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(venueData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create venue');
    }
  
    return await response.json();
};

// Function to fetch all venues
export const fetchAllVenues = async () => {
  const response = await fetch(`${BASE_URL}venues`);
  if (!response.ok) {
    throw new Error('Failed to fetch venues');
  }
  return await response.json();
};
