import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await loginUser(data); // Assuming loginUser handles the login logic and localStorage
      navigate('/'); // Redirect to home after successful login
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email Field */}
      <div>
        <label>Email:</label>
        <input type="email" {...register('email', { required: 'Email is required' })} placeholder="Your Email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label>Password:</label>
        <input type="password" {...register('password', { required: 'Password is required' })} placeholder="Your Password" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
