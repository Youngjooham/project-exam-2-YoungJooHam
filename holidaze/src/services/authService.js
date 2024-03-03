import { BASE_URL } from '../constants/api.js';

// Function to register a new user
export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}auth/register`, {
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
  const response = await fetch(`${BASE_URL}auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  localStorage.setItem('authToken', data.accessToken);
  localStorage.setItem('venueManager', String(data.venueManager));
  localStorage.setItem('name', data.name);

  return data;
};
