import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './DishList.css'; // Путь к вашему файлу стилей

const DishList = () => {
    const [dishes, setDishes] = useState([]);
    const [selectedDish, setSelectedDish] = useState(null);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedPath, setSelectedPath] = useState('');
    

    useEffect(() => {
        localStorage.removeItem('selectedDishId');
        const fetchDishes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/dishes/');
                setDishes(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке данных о блюдах:', error);
            }
        };

        const fetchTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/types/');
                setTypes(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке типов блюдов:', error);
            }
        };

        fetchDishes();
        fetchTypes();
    }, []);

    const handleDishClick = (dish) => {
        localStorage.setItem('selectedDishId', dish.id);
        setSelectedDish(dish.id);
        console.log(localStorage.getItem('selectedDishId'));
    };

    const handleTypeChange = (e) => {
        const selectedTypeId = parseInt(e.target.value, 10);
        setSelectedType(selectedTypeId);
    };

    const filteredDishes = selectedType
        ? dishes.filter(dish => dish.dishes_type === selectedType)
        : dishes;

    const handleAddDish = (path) => {
        setSelectedPath(path);
    };

    if (selectedDish || selectedPath) {
        console.log(localStorage.getItem('selectedDishId'));
        return (<Navigate to={`/dishes`} />);
    }

    return (
        <div className="dish-list-container">
            <h2>Выберите тип блюда:</h2>
            <select value={selectedType} onChange={handleTypeChange}>
                <option value="">Все типы</option>
                {types.map(type => (
                    <option key={type.id} value={type.id}>{type.dishes_types_name}</option>
                ))}
            </select>

            <h2>Выберите блюдо:</h2>
            <div className="dish-list-buttons">
                {filteredDishes.map(dish => (
                    <button key={dish.id} onClick={() => handleDishClick(dish)} className="dish-button">{dish.dishes_name}</button>
                ))}
            </div>

            <button onClick={handleAddDish} className="add-dish-button">Добавить блюдо</button>
        </div>
    );
};

export default DishList;
