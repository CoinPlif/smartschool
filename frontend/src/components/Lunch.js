import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DishTypes.css';

function Lunch() {
    const [dishes, setDishes] = useState([]);
    const [selectedLunDishes, setSelectedLunDishes] = useState([]);
    
    const navigate = useNavigate();
    const dishTypes = [1, 12, 7, 8, 9, 3];

    useEffect(() => {
        const lun_day = localStorage.getItem("date");
        const lun_child = localStorage.getItem("childId");

        const fetchLunDishesData = async () => {
            try {
                const dishesResponse = await axios.get('http://localhost:8000/api/dishes/');
                const allDishes = dishesResponse.data.filter(dish => dishTypes.includes(dish.dishes_type));
                allDishes.sort((a, b) => dishTypes.indexOf(a.dishes_type) - dishTypes.indexOf(b.dishes_type));
                setDishes(allDishes);

                const selectedResponse = await axios.get('http://localhost:8000/api/lundishes/');
                const filteredSelectedDishes = selectedResponse.data.filter(item => item.lun_day === lun_day && Number(item.lun_child) === Number(lun_child));
                if (filteredSelectedDishes.length > 0) {
                    const selectedDishesIds = [
                        filteredSelectedDishes[0].lun_drink,
                        filteredSelectedDishes[0].lun_first,
                        filteredSelectedDishes[0].lun_main,
                        filteredSelectedDishes[0].lun_garnish,
                        filteredSelectedDishes[0].lun_addition
                    ];
                    console.log("selectedDishesIds", selectedDishesIds);
                    const selectedDishes = allDishes.filter(dish => selectedDishesIds.includes(dish.id));
                    setSelectedLunDishes(selectedDishes);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchLunDishesData();
    }, []);

    const handleDishClick = (dish) => {
        setSelectedLunDishes(prevSelectedDishes => {
            let updatedSelectedDishes;
            if (prevSelectedDishes.some(d => d.id === dish.id)) {
                updatedSelectedDishes = prevSelectedDishes.filter(d => d.id !== dish.id);
            } else {
                updatedSelectedDishes = [...prevSelectedDishes, dish];
            }
            localStorage.setItem('selectedLunDishes', JSON.stringify(updatedSelectedDishes));
            return updatedSelectedDishes;
        });
    };

    const handleSubmit = async () => {
        let lun_day = localStorage.getItem("date");
        let lun_child = localStorage.getItem("childId");
        const lunDishData = {
            "lun_drink": selectedLunDishes.find(dish => (dish.dishes_type === 1 || dish.dishes_type === 12))?.id || null,
            "lun_first": selectedLunDishes.find(dish => dish.dishes_type === 7)?.id || null,
            "lun_main": selectedLunDishes.find(dish => dish.dishes_type === 8)?.id || null,
            "lun_garnish": selectedLunDishes.find(dish => dish.dishes_type === 9)?.id || null,
            "lun_addition": selectedLunDishes.find(dish => dish.dishes_type === 3)?.id || null,
            "lun_day": lun_day,
            "lun_child": lun_child
        };

        console.log("Submitting lunDishData:", lunDishData);
        try {
            const existingResponse = await axios.get('http://localhost:8000/api/lundishes/');
            const existingItem = existingResponse.data.find(item => item.lun_day === lun_day && Number(item.lun_child) === Number(lun_child));
            if (existingItem) {
                const response = await axios.patch(`http://localhost:8000/api/lundishes/${existingItem.id}/`, lunDishData);
                console.log("Successfully updated:", response.data);
            } else {
                const response = await axios.post('http://localhost:8000/api/lundishes/', lunDishData);
                console.log("Successfully submitted:", response.data);
            }
            navigate('/dinner');
        } catch (error) {
            console.error("Axios error config:", error.config);
        }
    };

    const renderDishes = (type) => (
        dishes.filter(dish => dish.dishes_type === type).map(dish => (
            <div
                key={dish.id}
                className={`dish ${selectedLunDishes.some(d => d.id === dish.id) ? 'selected' : ''}`}
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
            <h1>Выберете обед</h1>
            {dishTypes.map((type, index) => (
                <div key={type} className={`dishes-section ${(type === 1) ? 'no-separator' : ''}`}>
                    {renderDishes(type)}
                    {index < dishTypes.length - 1 && <hr />}
                </div>
            ))}
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Lunch;
