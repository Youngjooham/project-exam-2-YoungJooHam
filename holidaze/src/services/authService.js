// src/services/authService.js

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as required by your backend, such as an API key
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Assuming the server responds with error details in JSON format
      throw new Error(errorData.message || 'Failed to register');
    }

    const data = await response.json(); // Assuming successful registration response includes user data or a success message in JSON format
    return data;

  } catch (error) {
    throw error; // Throw the error to be handled by the calling function
  }
};

// Function to log in a user
export const loginUser = async (credentials) => {
  let name = '';
  let authToken = '';
  fetch ('https://api.noroff.dev/api/v1/holidaze/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error:', error);
  });
    
};
