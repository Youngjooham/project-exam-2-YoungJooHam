// src/services/authService.js

// Function to register a new user
export const registerUser = async (userData) => {
  const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to register');
  }

  return await response.json();
};

// Function to log in a user and save token and role
export const loginUser = async (credentials) => {
  const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  // Assuming the response includes accessToken and the user's role or venueManager flag
  localStorage.setItem('authToken', data.accessToken);
  localStorage.setItem('venueManager', String(data.venueManager));

  return data;
};
