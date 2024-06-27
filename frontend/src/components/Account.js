import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Account() {
    const [formData, setFormData] = useState({
        name: '',
        login: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            const role = localStorage.getItem("role");

            let apiUrl = '';
            if (role === 'parent') {
                apiUrl = `http://127.0.0.1:8000/api/parents/${userId}/`;
            } else if (role === 'schoolworker') {
                apiUrl = `http://127.0.0.1:8000/api/schoolworkers/${userId}/`;
            }

            try {
                const response = await axios.get(apiUrl);
                const userData = response.data;

                if (role === 'parent') {
                    setFormData({
                        name: userData.parents_name,
                        login: userData.parents_login,
                        password: userData.parents_password
                    });
                } else if (role === 'schoolworker') {
                    setFormData({
                        name: userData.schoolworkers_name,
                        login: userData.schoolworkers_login,
                        password: userData.schoolworkers_password
                    });
                }
            } catch (error) {
                setError('Ошибка при загрузке данных пользователя. Пожалуйста, попробуйте снова.');
                console.error('Ошибка загрузки данных пользователя:', error);
            }
        };

        fetchUserData();
    }, []);

    const saveData = () => {
        console.log('Сохранение данных:', formData);
        // Здесь можно добавить логику для сохранения данных на сервере или в localStorage
    };

    return (
        <div className="profile-container">
            <h1>Профиль пользователя</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="profile-form">
                <div className="form-group">
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="login">Логин (Email):</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <button onClick={saveData} className="save-button">Сохранить</button>
            </div>
        </div>
    );
}

export default Account;
