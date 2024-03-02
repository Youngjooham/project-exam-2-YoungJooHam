import React from 'react';
import { useForm } from 'react-hook-form';
import { createVenue } from '../services/venueService';
import useFormSubmit from '../hooks/useFormSubmit';

const CreateVenueForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleSubmit: handleFormSubmit, error } = useFormSubmit(createVenue, '/dashboard');

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input id="name" {...register('name', { required: 'Name is required' })} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea id="description" {...register('description', { required: 'Description is required' })} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
          {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input id="price" type="number" {...register('price', { valueAsNumber: true, required: 'Price is required' })} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
          {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="maxGuests" className="form-label">Max Guests:</label>
          <input id="maxGuests" type="number" {...register('maxGuests', { valueAsNumber: true, required: 'Max guests is required' })} className={`form-control ${errors.maxGuests ? 'is-invalid' : ''}`} />
          {errors.maxGuests && <div className="invalid-feedback">{errors.maxGuests.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="media" className="form-label">Media URL:</label>
          <input id="media" type="text" {...register('media.0')} placeholder="http://example.com/image.jpg" className="form-control" />
        </div>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <button type="submit" className="btn btn-primary">Create Venue</button>
      </form>
    </div>
  );
};

export default CreateVenueForm;
