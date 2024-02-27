import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useFormSubmit = (submitFunction, redirectPath) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await submitFunction(formData);
      navigate(redirectPath);
    } catch (error) {
      setError(error.message);
    }
  };

  return { handleSubmit, error };
};

export default useFormSubmit;
