import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';



const ParentsLogin = ({ onLogin }) => {
    const [formData, setFormData] = useState({
      parents_login: '',
      parents_password: ''
    });
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [parentsData, setParentsData] = useState(null);
    const [parentsId, setParentsId] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const fetchParentsData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/parents/', {
            login: formData.parents_login,
            password: formData.parents_password
        });
        const parent = response.data.find(parent =>
             (parent.parents_login === formData.parents_login && parent.parents_password === formData.parents_password)
        );
        setParentsData(parent);
        setParentsId(parent.id);
        localStorage.setItem('parent_id', parent.id);
      } catch (error) {
        console.error('Failed to fetch parents data:', error);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/parents/', {
          username: formData.parents_login,
          password: formData.parents_password
        });
        const token = response.data.auth_token;
        setIsLoggedIn(true);
        onLogin();
      } catch (error) {
        setError('Неверные учетные данные. Пожалуйста, попробуйте снова.');
        console.error('Authentication failed:', error);
      }
    };
  
    useEffect(() => {
      if (isLoggedIn) {
        fetchUserData();
      }
    }, [isLoggedIn]);
  
    if (isLoggedIn && userData) {
      return (
        <div className="register-container">
          <h2>Ваш ID пользователя: {userId}</h2>
          <Navigate to={`/subscription`} />
        </div>
      );
    }
  
    return (
      <section className="register-content">
        <div className="register-container">
          <h2>Вход</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              Имя пользователя:
              <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </label>
            <label>
              Пароль:
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </label>
            <button type="submit">Войти</button>
          </form>
        </div>
      </section>
    );
  };
  
  export default Login;