import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import '../css/Header.css';
import logo from '../images/logo.png';

const Header = () => {
    const navigate = useNavigate();
    const isUserLoggedIn = localStorage.getItem('authToken');
    const venueManager = localStorage.getItem('venueManager') === 'true'; 

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <header className="header">
            <NavLink to="/">
                <img src={logo} alt="Holidaze logo" style={{ width: '100px', height: 'auto' }} />
            </NavLink>        
            <nav className="navbar">
                <ul className="nav-links">
                    <li><NavLink to="/" end activeClassName="active-link">Venues</NavLink></li>
                    {isUserLoggedIn && <li><NavLink to="/dashboard" activeClassName="active-link">Dashboard</NavLink></li>}
                    {!isUserLoggedIn && <li><NavLink to="/register" activeClassName="active-link">Register</NavLink></li>}
                    {!isUserLoggedIn && <li><NavLink to="/login" activeClassName="active-link">Login</NavLink></li>}
                    {venueManager && <li><NavLink to="/create-venue" activeClassName="active-link">Create Venue</NavLink></li>}
                    {isUserLoggedIn && <li><button onClick={handleLogout}>Logout</button></li>}
                </ul>
            </nav>
        </header>
    );
}

export default Header;