import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Подключаем стили

function Login() {
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/parents/');
            const users = response.data;
            const user = users.find(
                user => user.parents_login === login && user.parents_password === password
            );

            if (user) {
                setMessage(`User found: ${user.id}`);
                localStorage.setItem('userId', user.id);
                setIsLoggedIn(true);
            } else {
                setMessage('Неверный логин или пароль');   
            }
        } catch (error) {
            setError('Неверные учетные данные. Пожалуйста, попробуйте снова.');
            console.error('Authentication failed:', error);
        }
    };

    if (isLoggedIn) {
        return (
            <div className="register-container">
                <Navigate to={`/children`} />
            </div>
        );
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="login-form">
                <input
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="login-input"
                />
                <button onClick={fetchUserData} className="login-button">Войти</button>
            </div>
            {message && <p className="login-message">{message}</p>}
        </div>
    );
}

export default Login;
