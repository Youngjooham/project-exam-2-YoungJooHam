import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import CreateVenueForm from './components/CreateVenueForm'; // Make sure to create this component
import ProtectedRoute from './components/ProtectedRoute'; // Make sure to create this component
import UnauthorizedPage from './pages/UnauthorizedPage'; // Optional: Create a page to display when access is unauthorized

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route 
          path="/create-venue" 
          element={
            <ProtectedRoute>
              <CreateVenueForm /> {/* This route is now protected and only accessible by venue managers */}
            </ProtectedRoute>
          } 
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} /> {/* Unauthorized route */}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
