import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../services/authService';
import useFormSubmit from '../hooks/useFormSubmit';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleSubmit: handleFormSubmit, error } = useFormSubmit(loginUser, '/dashboard'); 

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="container mt-4">
      <div className="row mb-3 justify-content-center">
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email:</label>
          <input id="email" type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email', { required: 'Email is required' })} placeholder="Your Email" />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
      </div>

      <div className="row mb-3 justify-content-center">
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Password:</label>
          <input id="password" type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} {...register('password', { required: 'Password is required' })} placeholder="Your Password" />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="text-center">
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
