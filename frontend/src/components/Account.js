import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Account.css'; // Import the CSS file

function Account() {
    const [initialFormData, setInitialFormData] = useState({
        name: '',
        login: '',
        password: ''
    });
    const [formData, setFormData] = useState({
        name: '',
        login: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

                const newFormData = {
                    name: role === 'parent' ? userData.parents_name : userData.schoolworkers_name,
                    login: role === 'parent' ? userData.parents_login : userData.schoolworkers_login,
                    password: role === 'parent' ? userData.parents_password : userData.schoolworkers_password,
                };

                setInitialFormData(newFormData);
                setFormData(newFormData);
            } catch (error) {
                setError('Ошибка при загрузке данных пользователя. Пожалуйста, попробуйте снова.');
                console.error('Ошибка загрузки данных пользователя:', error);
            }
        };

        fetchUserData();
    }, []);

    const saveData = async () => {
        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");

        let apiUrl = '';
        if (role === 'parent') {
            apiUrl = `http://127.0.0.1:8000/api/parents/${userId}/`;
        } else if (role === 'schoolworker') {
            apiUrl = `http://127.0.0.1:8000/api/schoolworkers/${userId}/`;
        }

        try {
            if (role === 'schoolworker') {
                await axios.patch(apiUrl, {
                    "schoolworkers_login": formData.login,
                    "schoolworkers_password": formData.password
                });
            }else{
                await axios.patch(apiUrl, {
                    "parents_name": formData.name,
                    "parents_login": formData.login,
                    "parents_password": formData.password
                });
            }
            
            setSuccess('Данные успешно сохранены.');
            setError('');
            setInitialFormData(formData); 
        } catch (error) {
            setError('Ошибка при сохранении данных. Пожалуйста, попробуйте снова.');
            setSuccess('');
            console.error('Ошибка сохранения данных:', error);
        }
    };

    const isFormChanged = () => {
        return formData.name !== initialFormData.name || formData.login !== initialFormData.login || formData.password !== initialFormData.password;
    };

    return (
        <div>
            <main id="account-main">
                <h1>Аккаунт</h1>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <h4>Имя</h4>
                <input 
                    className="account" 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                />

                <h4>Логин</h4>
                <input 
                    className="account" 
                    type="text" 
                    id="login" 
                    name="login" 
                    value={formData.login} 
                    onChange={handleChange} 
                />

                <h4>Пароль</h4>
                <input 
                    className="account" 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                />
                <div className="button-container">
                    <button 
                        onClick={saveData} 
                        className="save-button" 
                        disabled={!isFormChanged()}
                    >
                        Сохранить
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Account;
