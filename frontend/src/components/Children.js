import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './Children.css'; // Подключаем стили

function Children() {
    const [error, setError] = useState(null);
    const [children, setChildren] = useState([]);
    const [selectedChildId, setSelectedChildId] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        
        if (userId) {
            const fetchChildren = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/children/?parents_id=${userId}`);
                    console.log("Response data:", response.data);
                    setChildren(response.data);
                } catch (error) {
                    console.error("Error fetching children:", error);
                    setError(error);
                }
            };
            fetchChildren();
        } else {
            setError('No user ID found in localStorage.');
        }
    }, []);

    if (selectedChildId){
        return (
            <div className="register-container">
              <Navigate to={`/date`} />
            </div>
        );
    };

    const handleChildSelection = (childId) => {
        setSelectedChildId(childId);
        localStorage.setItem('childId', childId);
    };

    return (
        <div className="children-container">
            <h1>Выберете ребенка</h1>
            {error && <p className="error-message">{error}</p>}
            {children.map(child => (
                <button
                    key={child.id}
                    className="child-button"
                    onClick={() => handleChildSelection(child.id)}
                >
                    {child.children_name} {child.children_surname}
                </button>
            ))}
        </div>
    );
}

export default Children;
