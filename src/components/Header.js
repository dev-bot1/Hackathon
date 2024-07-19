import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 2rem',
        backgroundColor: '#007bff',
        color: '#fff',
        height: '50px',
    };

    const logoStyle = {
        textDecoration: 'none',
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    };

    const navStyle = {
        listStyle: 'none',
        display: 'flex',
        gap: '1rem',
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#fff',
        padding: '0.5rem 1rem',
        transition: 'background-color 0.3s ease',
    };

    const linkHoverStyle = {
        backgroundColor: '#0056b3',
        borderRadius: '5px',
    };

    return (
        <header style={headerStyle}>
            <div className="logo">
                <Link to="/" style={logoStyle}>Ghar Aaja</Link>
            </div>
            <nav className="nav">
                <ul style={navStyle}>
                    <li><Link to="/" style={linkStyle} onMouseOver={(e) => e.currentTarget.style = { ...linkStyle, ...linkHoverStyle }} onMouseOut={(e) => e.currentTarget.style = linkStyle}>Home</Link></li>
                    <li><Link to="/metrics" style={linkStyle} onMouseOver={(e) => e.currentTarget.style = { ...linkStyle, ...linkHoverStyle }} onMouseOut={(e) => e.currentTarget.style = linkStyle}>Our Mectrics</Link></li>
                    <li><Link to="/Notifications" style={linkStyle} onMouseOver={(e) => e.currentTarget.style = { ...linkStyle, ...linkHoverStyle }} onMouseOut={(e) => e.currentTarget.style = linkStyle}>Notifications</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
