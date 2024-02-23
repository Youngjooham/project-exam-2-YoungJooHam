import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../services/authService'; // Adjust the path as needed

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (submitData) => {
    const registrationPayload = {
      ...submitData,
      venueManager: submitData.venueManager || false,
    };

    try {
      await registerUser(registrationPayload)
      
      // Handle successful registration (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Registration failed', error);
      // Handle registration errors (e.g., display an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name Field */}
      <div>
        <label>Name:</label>
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label>Email:</label>
        <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Entered value does not match email format' } })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label>Password:</label>
        <input type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must have at least 8 characters' } })} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {/* Venue Manager Checkbox */}
      <div>
        <input type="checkbox" {...register('venueManager')} />
        <label>Register as Venue Manager</label>
      </div>

      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;