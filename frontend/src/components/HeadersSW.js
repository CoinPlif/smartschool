import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import './Header.css';

const HeaderSW = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <header className="header">
            <img src={logo} className="logo" alt="logo" />
            <nav>
                <ul>
                    <li><Link to="/dishlist" className="nav-button">Блюда</Link></li>
                    <li><Link to="/account" className="nav-button">Аккаунт</Link></li>
                    <li><Link to="/statistics" className="nav-button">Статистика</Link></li>
                    <li><Link to="/login" onClick={handleLogout} className="logout-button">Выход</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderSW;