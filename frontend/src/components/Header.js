import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';
import axios from 'axios';
import './Header.css';

const Header = () => {
    const [childName, setChildName] = useState(null);
    const [childSureName, setChildSureName] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();

    useEffect(() => {
        const fetchChildInfo = async () => {
            try {
                const childId = localStorage.getItem("childId");
                if (childId) {
                    const response = await axios.get(`http://localhost:8000/api/children/${childId}/`);
                    const { children_name, children_surname } = response.data;
                    setChildName(children_name);
                    setChildSureName(children_surname);
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных о ребенке:', error);
            }
        };

        fetchChildInfo();
    }, [location]); // Обновление данных при изменении маршрута

    const handleLogout = () => {
        localStorage.clear();
        // Навигация на главную страницу
    };

    const handleOrderClick = (e) => {
        const childId = localStorage.getItem("childId");
        if (!childId) {
            e.preventDefault();
            setErrorMessage('Пожалуйста, выберите ребенка');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000); // Message will disappear after 3 seconds
        }
    };

    const orderButtonText = childName ? `${childName}` : 'Выберите ребенка';

    return (
        <header className="header">
            <img src={logo} className="logo" alt="logo" />
            <nav>
                <ul>
                   
                    <li><Link to="/children" className="nav-button">{orderButtonText}</Link></li>
                    <li><Link to="/date" onClick={handleOrderClick} className="nav-button">Выбрать меню</Link></li>
                    <li><Link to="/account" className="nav-button">Аккаунт</Link></li>
                    <li><Link to="/menu" onClick={handleOrderClick}  className="nav-button">Заказы</Link></li>
                    <li><Link to="/payment" onClick={handleOrderClick} className="nav-button">Оплата</Link></li>
                    <li><Link to="/" onClick={handleLogout} className="logout-button">Выход</Link></li>
                </ul>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </nav>
        </header>
    );
};

export default Header;
