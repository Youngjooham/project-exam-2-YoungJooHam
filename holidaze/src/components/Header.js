import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 

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
            <h1 className="logo">Holidaze</h1>
            <nav className="navbar">
                <ul className="nav-links">
                    <li><NavLink to="/" end activeClassName="active-link">Home</NavLink></li>
                    <li><NavLink to="/about" activeClassName="active-link">About</NavLink></li>
                    <li><NavLink to="/contact" activeClassName="active-link">Contact</NavLink></li>
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
