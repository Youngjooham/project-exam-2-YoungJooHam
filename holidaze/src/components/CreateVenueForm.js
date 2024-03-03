import React from 'react';
import { useForm } from 'react-hook-form';
import { createVenue } from '../services/venueService';
import useFormSubmit from '../hooks/useFormSubmit';

const CreateVenueForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleSubmit: handleFormSubmit, error, successMessage } = useFormSubmit(createVenue, '/Dashboard');
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input id="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} {...register('name', { required: 'Name is required' })} />
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea id="description" className={`form-control ${errors.description ? 'is-invalid' : ''}`} {...register('description', { required: 'Description is required' })} />
        {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price:</label>
        <input id="price" type="number" className={`form-control ${errors.price ? 'is-invalid' : ''}`} {...register('price', { valueAsNumber: true, required: 'Price is required' })} />
        {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="maxGuests" className="form-label">Max Guests:</label>
        <input id="maxGuests" type="number" className={`form-control ${errors.maxGuests ? 'is-invalid' : ''}`} {...register('maxGuests', { valueAsNumber: true, required: 'Max guests is required' })} />
        {errors.maxGuests && <div className="invalid-feedback">{errors.maxGuests.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="media" className="form-label">Media URL:</label>
        <input id="media" type="text" className="form-control" {...register('media.0')} placeholder="http://example.com/image.jpg" />
      </div>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
      <button type="submit" className="btn btn-primary">Create Venue</button>
    </form>
  );
};

export default CreateVenueForm;
