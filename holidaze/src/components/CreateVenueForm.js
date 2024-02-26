// src/components/CreateVenueForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { createVenue } from '../services/venueService';
import useFormSubmit from '../hooks/useFormSubmit';

const CreateVenueForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleSubmit: handleFormSubmit, error } = useFormSubmit(createVenue, '/venues'); // Assuming you have a route '/venues' to list venues or show a confirmation

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register('name', { required: 'Name is required' })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" {...register('description', { required: 'Description is required' })} />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="price">Price:</label>
        <input id="price" type="number" {...register('price', { valueAsNumber: true, required: 'Price is required' })} />
        {errors.price && <p>{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="maxGuests">Max Guests:</label>
        <input id="maxGuests" type="number" {...register('maxGuests', { valueAsNumber: true, required: 'Max guests is required' })} />
        {errors.maxGuests && <p>{errors.maxGuests.message}</p>}
      </div>


      {/* Example for a single media URL input */}
      <div>
        <label htmlFor="media">Media URL:</label>
        <input id="media" type="text" {...register('media.0')} placeholder="http://example.com/image.jpg" />
      </div>

      
      {error && <p>{error}</p>}
      <button type="submit">Create Venue</button>
    </form>
  );
};

export default CreateVenueForm;
