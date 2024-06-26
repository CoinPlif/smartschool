import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DishTypes.css';

function Breakfast() {
    const [dishes, setDishes] = useState([]);
    const [selectedBrDishes, setSelectedBrDishes] = useState([]);
    
    const navigate = useNavigate();
    const dishTypes = [1, 5, 2, 3];

    useEffect(() => {
        const br_day = localStorage.getItem("date");
        const br_child = localStorage.getItem("childId");

        const fetchBrDishesData = async () => {
            try {
                const dishesResponse = await axios.get('http://localhost:8000/api/dishes/');
                const allDishes = dishesResponse.data.filter(dish => dishTypes.includes(dish.dishes_type));
                allDishes.sort((a, b) => dishTypes.indexOf(a.dishes_type) - dishTypes.indexOf(b.dishes_type));
                setDishes(allDishes);

                // Получаем информацию о выбранных блюдах на конкретную дату и для конкретного ребенка
                const selectedResponse = await axios.get('http://localhost:8000/api/brdishes/');
                const filteredSelectedDishes = selectedResponse.data.filter(item => item.br_day === br_day && Number(item.br_child) === Number(br_child));
                if (filteredSelectedDishes.length > 0) {
                    const selectedDishesIds = [
                        filteredSelectedDishes[0].br_drink,
                        filteredSelectedDishes[0].br_main,
                        filteredSelectedDishes[0].br_addition
                    ];
                    console.log("selectedDishesIds", selectedDishesIds);
                    const selectedDishes = allDishes.filter(dish => selectedDishesIds.includes(dish.id));
                    setSelectedBrDishes(selectedDishes);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchBrDishesData();
    }, []);

    const handleDishClick = (dish) => {
        setSelectedBrDishes(prevSelectedDishes => {
            let updatedSelectedDishes;
            if (prevSelectedDishes.some(d => d.id === dish.id)) {
                updatedSelectedDishes = prevSelectedDishes.filter(d => d.id !== dish.id);
            } else {
                updatedSelectedDishes = [...prevSelectedDishes, dish];
            }
            localStorage.setItem('selectedBrDishes', JSON.stringify(updatedSelectedDishes));
            return updatedSelectedDishes;
        });
    };

    const handleSubmit = async () => {
        let br_day = localStorage.getItem("date");
        let br_child = localStorage.getItem("childId");
        const brDishData = {
            "br_drink": selectedBrDishes.find(dish => (dish.dishes_type === 5 || dish.dishes_type === 1))?.id || null,
            "br_main": selectedBrDishes.find(dish => dish.dishes_type === 2)?.id || null,
            "br_addition": selectedBrDishes.find(dish => dish.dishes_type === 3)?.id || null,
            "br_day": br_day,
            "br_child": br_child
        };

        console.log("Submitting brDishData:", brDishData);
        try {
            const existingResponse = await axios.get('http://localhost:8000/api/brdishes/');
            const existingItem = existingResponse.data.find(item => item.br_day === br_day && Number(item.br_child) === Number(br_child));
            if (existingItem) {
                const response = await axios.patch(`http://localhost:8000/api/brdishes/${existingItem.id}/`, brDishData);
                console.log("Successfully updated:", response.data);
            } else {
                const response = await axios.post('http://localhost:8000/api/brdishes/', brDishData);
                console.log("Successfully submitted:", response.data);
            }
            navigate('/lunch');
        } catch (error) {
            console.error("Axios error config:", error.config);
        }
    };

    const renderDishes = (type) => (
        dishes.filter(dish => dish.dishes_type === type).map(dish => (
            <div
                key={dish.id}
                className={`dish ${selectedBrDishes.some(d => d.id === dish.id) ? 'selected' : ''}`}
                onClick={() => handleDishClick(dish)}
            >
                <div className="dish-header">
                    <h3>{dish.dishes_name}</h3>
                    <p className="price">{dish.dishes_price} руб.</p>
                </div>
                <div className="dish-info">
                    <p className="description">{dish.dishes_description}</p>
                    <p className="calories">Калорий: {dish.dishes_calories}</p>
                </div>
            </div>
        ))
    );

    return (
        <div className="dish-container">
            <h1>Выберете завтрак</h1>
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

export default Breakfast;
