import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';


function Role() {
    const [role, setRole] = useState(null)

    const handleRole = (role) => {
        localStorage.setItem('role', role);
        setRole(role);
    };

    if (role){
        return (
            <div className="register-container">
              <Navigate to={`/login`} />
            </div>
        );
    };
    
    return (
        <div id="roles">
            <h1>Выберите Вашу роль</h1>
            <button className="role" id="parent" onClick={() => handleRole('parent')}>Родитель</button>
            <button className="role" id="worker" onClick={() => handleRole('schoolworker')}>Работник учреждения</button>
        </div>
    );
}

export default Role;
