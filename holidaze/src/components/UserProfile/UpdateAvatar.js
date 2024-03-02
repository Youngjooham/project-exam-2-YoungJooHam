import React, { useState } from 'react';

const UpdateAvatar = ({ onAvatarUpdated }) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = localStorage.getItem('name');
    const authToken = localStorage.getItem('authToken');

    const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/media`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ avatar: avatarUrl || null })
    });

    if (response.ok) {
      alert('Avatar updated successfully');
      // Call the onAvatarUpdated function after the avatar is updated
      onAvatarUpdated();
    } else {
      alert('Failed to update avatar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New Avatar URL:
        <input type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} required />
      </label>
      <button type="submit">Update Avatar</button>
    </form>
  );
};

export default UpdateAvatar;