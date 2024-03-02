import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../services/authService';
import useFormSubmit from '../hooks/useFormSubmit';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleSubmit: handleFormSubmit, error } = useFormSubmit(registerUser, '/login');

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register('name', { required: 'Name is required' })} placeholder="Full Name" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Entered value does not match email format' } })} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must have at least 8 characters' } })} placeholder="Password" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label>Avatar URL:</label>
        <input type="text" {...register('avatar')} placeholder="Avatar URL" />
        {/* No validation error for optional field */}
      </div>
      <div>
        <input type="checkbox" {...register('venueManager')} />
        <label>Register as Venue Manager</label>
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
