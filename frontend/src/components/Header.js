import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        
        localStorage.clear();
        console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
        navigate('/login');
    };

    return (
        <header className="header">
            <img src={logo} className="logo" alt="logo" />
            <nav>
                <ul>
                    <li><Link to="/account" className="nav-button">Аккаунт</Link></li>
                    <li><Link to="/menu" className="nav-button">Заказы</Link></li>
                    <li><button onClick={handleLogout} className="logout-button">Выход</button></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
