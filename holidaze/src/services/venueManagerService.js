// src/services/venueManagerService.js

// Function to fetch all venues by a specific profile
export const fetchVenuesByProfile = async (name) => {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/venues`, {
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
    if (!authToken) throw new Error('No authorization token found');
  
    const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`, {
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