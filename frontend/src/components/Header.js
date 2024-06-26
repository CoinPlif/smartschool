import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <img src={logo} className="logo" alt="logo" />
            <nav>
                <ul>
                    <li><Link to="/account">Аккаунт</Link></li>
                    <li><Link to="/menu">Заказы</Link></li>
                    <li><Link to="/exit">Выход</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;