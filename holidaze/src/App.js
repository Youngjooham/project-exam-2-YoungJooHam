// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import CreateVenueForm from './components/CreateVenueForm';
import VenueDetailPage from './pages/VenueDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import UnauthorizedPage from './pages/UnauthorizedPage';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import BookingDetails from './pages/BookingDetails'; // Import the BookingDetails component
import ManageVenue from './pages/ManageVenue';

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
              <CreateVenueForm />
            </ProtectedRoute>
          } 
        />
        <Route path="/venues/:id" element={<VenueDetailPage />} />
        <Route path="/bookings/:id" element={<BookingDetails />} />
        <Route path="/manage-venue/:id" element={<ManageVenue />} /> {/* Add the route for ManageVenue */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;