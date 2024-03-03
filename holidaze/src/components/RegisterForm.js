import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../services/authService';
import useFormSubmit from '../hooks/useFormSubmit';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleSubmit: handleFormSubmit, error } = useFormSubmit(registerUser, '/login');

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="container mt-4">
      {/* Name input row */}
      <div className="row mb-3 justify-content-center">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Name:</label>
          <input id="name" type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} {...register('name', { required: 'Name is required' })} placeholder="Full Name" />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>
      </div>
      {/* Email input row */}
      <div className="row mb-3 justify-content-center">
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email:</label>
          <input id="email" type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email', { required: 'Email is required' })} placeholder="Email" />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
      </div>
      {/* Password input row */}
      <div className="row mb-3 justify-content-center">
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Password:</label>
          <input id="password" type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} {...register('password', { required: 'Password is required' })} placeholder="Password" />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
      </div>
      {/* Avatar URL input row */}
      <div className="row mb-3 justify-content-center">
        <div className="col-md-6">
          <label htmlFor="avatar" className="form-label">Avatar URL:</label>
          <input id="avatar" type="text" className="form-control" {...register('avatar')} placeholder="Optional" />
        </div>
      </div>
      {/* Venue Manager checkbox row */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-check">
            <input id="venueManager" type="checkbox" className="form-check-input" {...register('venueManager')} />
            <label htmlFor="venueManager" className="form-check-label">Register as Venue Manager</label>
          </div>
        </div>
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="text-center">
        <button type="submit" className="btn btn-primary">Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;
