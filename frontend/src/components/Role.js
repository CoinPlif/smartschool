import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Role.css'; // Подключаем стили

function Role() {
    const [role, setRole] = useState(null);

    const handleRole = (role) => {
        localStorage.setItem('role', role);
        setRole(role);
        console.log(`Role ${role} is choosed`)
    };

    if (role) {
        return (
            <div className="register-container">
                <Navigate to={`/login`} />
            </div>
        );
    }

    return (
        <div className="role-container">
            <h1>Выберите Вашу роль</h1>
            <button className="role-button" id="parent" onClick={() => handleRole('parent')}>Родитель</button>
            <button className="role-button" id="worker" onClick={() => handleRole('schoolworker')}>Работник учреждения</button>
        </div>
    );
}

export default Role;