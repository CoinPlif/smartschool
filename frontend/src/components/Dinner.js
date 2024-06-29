import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DishTypes.css';

function Dinner() {
    const [dishes, setDishes] = useState([]);
    const [selectedDinDishes, setSelectedDinDishes] = useState([]);
    
    const navigate = useNavigate();
    const dishTypes = [1, 11, 13, 10, 3];

    useEffect(() => {
        const din_day = localStorage.getItem("date");
        const din_child = localStorage.getItem("childId");

        const fetchDinDishesData = async () => {
            try {
                const dishesResponse = await axios.get('http://localhost:8000/api/dishes/');
                const allDishes = dishesResponse.data.filter(dish => dishTypes.includes(dish.dishes_type));
                allDishes.sort((a, b) => dishTypes.indexOf(a.dishes_type) - dishTypes.indexOf(b.dishes_type));
                setDishes(allDishes);
                const selectedResponse = await axios.get('http://localhost:8000/api/dindishes/');
                const filteredSelectedDishes = selectedResponse.data.filter(item => item.din_day === din_day && Number(item.din_child) === Number(din_child));
                if (filteredSelectedDishes.length > 0) {
                    const selectedDishesIds = [
                        filteredSelectedDishes[0].din_drink,
                        filteredSelectedDishes[0].din_main,
                        filteredSelectedDishes[0].din_garnish,
                        filteredSelectedDishes[0].din_addition
                    ];
                    console.log("selectedDishesIds", selectedDishesIds);
                    const selectedDishes = allDishes.filter(dish => selectedDishesIds.includes(dish.id));
                    setSelectedDinDishes(selectedDishes);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchDinDishesData();
    }, []);

    const handleDishClick = (dish) => {
        setSelectedDinDishes(prevSelectedDishes => {
            let updatedSelectedDishes;
            if (prevSelectedDishes.some(d => d.id === dish.id)) {
                updatedSelectedDishes = prevSelectedDishes.filter(d => d.id !== dish.id);
            } else {
                updatedSelectedDishes = [...prevSelectedDishes, dish];
            }
            localStorage.setItem('selectedDinDishes', JSON.stringify(updatedSelectedDishes));
            return updatedSelectedDishes;
        });
    };

    const handleSubmit = async () => {
        let din_day = localStorage.getItem("date");
        let din_child = localStorage.getItem("childId");
        const dinDishData = {
            "din_drink": selectedDinDishes.find(dish => (dish.dishes_type === 1 || dish.dishes_type === 11))?.id || null,
            "din_main": selectedDinDishes.find(dish => dish.dishes_type === 10)?.id || null,
            "din_garnish": selectedDinDishes.find(dish => dish.dishes_type === 13)?.id || null,
            "din_addition": selectedDinDishes.find(dish => dish.dishes_type === 3)?.id || null,
            "din_day": din_day,
            "din_child": din_child
        };

        console.log("Submitting dinDishData:", dinDishData);
        try {
            const existingResponse = await axios.get('http://localhost:8000/api/dindishes/');
            const existingItem = existingResponse.data.find(item => item.din_day === din_day && Number(item.din_child) === Number(din_child));
            if (existingItem) {
                const response = await axios.patch(`http://localhost:8000/api/dindishes/${existingItem.id}/`, dinDishData);
                console.log("Successfully updated:", response.data);
            } else {
                const response = await axios.post('http://localhost:8000/api/dindishes/', dinDishData);
                console.log("Successfully submitted:", response.data);
            }
            navigate('/order');
        } catch (error) {
            console.error("Axios error config:", error.config);
        }
    };

    const renderDishes = (type) => (
        dishes.filter(dish => dish.dishes_type === type).map(dish => (
            <div
                key={dish.id}
                className={`dish ${selectedDinDishes.some(d => d.id === dish.id) ? 'selected' : ''}`}
                onClick={() => handleDishClick(dish)}
            >
                <div className="dish-header">
                    <h3>{dish.dishes_name}</h3>
                    <p className="price">{dish.dishes_price} руб.</p>
                </div>
                <div className="dish-info">
                    <p className="description">Состав: {dish.dishes_description}</p>
                    <p className="calories">Калорий: {dish.dishes_calories}</p>
                </div>
            </div>
        ))
    );

    return (
        <div className="dish-container">
            <h1>Выберете ужин</h1>
            {dishTypes.map((type, index) => (
                <div key={type} className={`dishes-section ${(type === 1) ? 'no-separator' : ''}`}>
                    {renderDishes(type)}
                    {index < dishTypes.length - 1 && <hr />}
                </div>
            ))}
            <button className="submit-button" onClick={handleSubmit}>Подтвердить</button>
        </div>
    );
}

export default Dinner;
