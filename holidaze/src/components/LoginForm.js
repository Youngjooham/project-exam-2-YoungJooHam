import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../services/authService';
import useFormSubmit from '../hooks/useFormSubmit';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleSubmit: handleFormSubmit, error } = useFormSubmit(loginUser, '/');

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label>Email:</label>
        <input type="email" {...register('email', { required: 'Email is required' })} placeholder="Your Email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" {...register('password', { required: 'Password is required' })} placeholder="Your Password" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
