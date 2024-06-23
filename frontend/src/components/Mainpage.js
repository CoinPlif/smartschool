import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const Mainpage = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/dishes/');
                setDishes(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Dishes</h1>
                <ul>
                    {dishes.map(dish => (
                        <li key={dish.id}>
                            <p><strong>Name:</strong> {dish.dishes_name}</p>
                            <p><strong>Description:</strong> {dish.dishes_description}</p>
                            <p><strong>Type:</strong> {dish.dishes_type}</p>
                            <p><strong>Calories:</strong> {dish.dishes_calories}</p>
                            <p><strong>Price:</strong> ${dish.dishes_price}</p>
                        </li>
                    ))}
                </ul>
        </div>
    );
};

export default Mainpage;