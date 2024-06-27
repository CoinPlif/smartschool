import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Подключаем стили

function Login() {
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('parent');
    const fetchUserData = async () => {
        let apiUrl = '';

        if (role === 'parent') {
            apiUrl = 'http://localhost:8000/api/parents/';
        } else if (role === 'schoolworker') {
            apiUrl = 'http://127.0.0.1:8000/api/schoolworkers/';
        } else {
            setMessage('Не выбрана роль');
            return;
        }

        try {
            const response = await axios.get(apiUrl);
            const users = response.data;
            const user = users.find(
                user => (role === 'parent' ? user.parents_login : user.schoolworkers_login) === login &&
                        (role === 'parent' ? user.parents_password : user.schoolworkers_password) === password
            );

            if (user) {
                setMessage(`User found: ${user.id}`);
                localStorage.setItem('userId', user.id);
                localStorage.setItem('role', role);
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
                <Navigate to={role === 'parent' ? '/children' : '/dishes'} />
            </div>
        );
    }

    return (
        <div className="login-container">
            <h1>Введите учетные данные</h1>
            <div className="role-buttons">
                <button 
                    className={`role-button ${role === 'parent' ? 'active' : ''}`} 
                    onClick={() => setRole('parent')}
                >
                    Родитель
                </button>
                <button 
                    className={`role-button ${role === 'schoolworker' ? 'active' : ''}`} 
                    onClick={() => setRole('schoolworker')}
                >
                    Сотрудник
                </button>
            </div>
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
