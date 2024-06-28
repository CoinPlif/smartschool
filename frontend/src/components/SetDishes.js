import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './SetDishes.css';

function SetDishes() {
    const [types, setTypes] = useState([]);
    const [dishesType, setDishesType] = useState('');
    const [dishesName, setDishesName] = useState('');
    const [dishesDescription, setDishesDescription] = useState('');
    const [dishesCalories, setDishesCalories] = useState('');
    const [dishesPrice, setDishesPrice] = useState('');
    const [validFrom, setValidFrom] = useState(null);
    const [validTo, setValidTo] = useState(null);
    const [minValidToDate, setMinValidToDate] = useState(null);
    const [errors, setErrors] = useState({});
    const [selectedDishId, setSelectedDishId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTypes();
        const dishId = localStorage.getItem("selectedDishId");
        if (dishId) {
            setSelectedDishId(dishId);
            fetchDishData(dishId);
        }
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/types/');
            setTypes(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке типов блюд:', error);
        }
    };

    const fetchDishData = async (dishId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/dishes/${dishId}/`);
            const { dishes_type, dishes_name, dishes_description, dishes_calories, dishes_price, valid_from_dttm, valid_to_dttm } = response.data;
            setDishesType(dishes_type);
            setDishesName(dishes_name);
            setDishesDescription(dishes_description);
            setDishesCalories(dishes_calories);
            setDishesPrice(dishes_price);
            setValidFrom(new Date(valid_from_dttm));
            setValidTo(new Date(valid_to_dttm));
            const minToDate = new Date(valid_from_dttm);
            minToDate.setDate(minToDate.getDate() + 1);
            setMinValidToDate(minToDate);
        } catch (error) {
            console.error('Ошибка при загрузке данных блюда:', error);
        }
    };

    const handleSubmit = async () => {
        setErrors({});
        if (!dishesType || !dishesName || !dishesCalories || !dishesPrice || !validFrom || !validTo) {
            setErrors({
                dishesType: !dishesType,
                dishesName: !dishesName,
                dishesCalories: !dishesCalories,
                dishesPrice: !dishesPrice,
                validFrom: !validFrom,
                validTo: !validTo,
            });
            return ;
        }

        // Проверка на числовые данные для цены и калорийности
        if (isNaN(Number(dishesCalories)) || isNaN(Number(dishesPrice))) {
            setErrors({
                ...errors,
                dishesCalories: isNaN(Number(dishesCalories)),
                dishesPrice: isNaN(Number(dishesPrice)),
            });
            return;
        }

        const updatedDish = {
            "dishes_type": dishesType,
            "dishes_name": dishesName,
            "dishes_description": dishesDescription,
            "dishes_calories": dishesCalories,
            "dishes_price": dishesPrice,
            "valid_from_dttm": validFrom,
            "valid_to_dttm": validTo,
        };

        try {
            if (selectedDishId) {
                const response = await axios.patch(`http://localhost:8000/api/dishes/${selectedDishId}/`, updatedDish);
                console.log('Блюдо успешно обновлено:', response.data);
                
            } else {
                const response = await axios.post('http://localhost:8000/api/dishes/', updatedDish);
                console.log('Блюдо успешно создано:', response.data);
            }
            setDishesType('');
            setDishesName('');
            setDishesDescription('');
            setDishesCalories('');
            setDishesPrice('');
            setValidFrom(null);
            setValidTo(null);
            setMinValidToDate(null);
            setErrors({});
            navigate("/dishlist");
        } catch (error) {
            console.error('Ошибка при сохранении блюда:', error);
        }
    };

    return (
        <div className="create-dish-container">
            <h1>{selectedDishId ? 'Редактирование блюда' : 'Создание блюда'}</h1>

            <div className="input-group">
                <label htmlFor="dishesType">Тип блюда:</label>
                <select
                    id="dishesType"
                    value={dishesType}
                    onChange={(e) => setDishesType(e.target.value)}
                    className={errors.dishesType ? 'error' : ''}
                    disabled={selectedDishId !== null} // Disable if editing existing dish
                >
                    <option value="">Выберите тип блюда</option>
                    {types.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.dishes_types_name}
                        </option>
                    ))}
                </select>
                {errors.dishesType && <span className="error-text">Выберите тип блюда</span>}
            </div>

            <div className="input-group">
                <label htmlFor="dishesName">Название блюда:</label>
                <input
                    type="text"
                    id="dishesName"
                    value={dishesName}
                    onChange={(e) => setDishesName(e.target.value)}
                    className={errors.dishesName ? 'error' : ''}
                />
                {errors.dishesName && <span className="error-text">Введите название блюда</span>}
            </div>

            <div className="input-group">
                <label htmlFor="dishesDescription">Описание блюда:</label>
                <textarea
                    id="dishesDescription"
                    value={dishesDescription}
                    onChange={(e) => setDishesDescription(e.target.value)}
                    rows={5}
                    className={errors.dishesDescription ? 'error fixed-height' : 'fixed-height'}
                />
            </div>

            <div className="input-group">
                <label htmlFor="dishesCalories">Калорийность:</label>
                <input
                    type="number"
                    id="dishesCalories"
                    value={dishesCalories}
                    onChange={(e) => setDishesCalories(e.target.value)}
                    className={errors.dishesCalories ? 'error' : ''}
                />
                {errors.dishesCalories && <span className="error-text">Введите числовое значение</span>}
            </div>

            <div className="input-group">
                <label htmlFor="dishesPrice">Цена (руб.):</label>
                <input
                    type="number"
                    id="dishesPrice"
                    value={dishesPrice}
                    onChange={(e) => setDishesPrice(e.target.value)}
                    className={errors.dishesPrice ? 'error' : ''}
                />
                {errors.dishesPrice && <span className="error-text">Введите числовое значение</span>}
            </div>

            <div className="input-group">
                <label htmlFor="validFrom">Доступно с:</label>
                <DatePicker
                    id="validFrom"
                    selected={validFrom}
                    onChange={(date) => {
                        setValidFrom(date);
                        if (date) {
                            const nextDay = new Date(date);
                            nextDay.setDate(nextDay.getDate() + 1);
                            setValidTo(null);
                            setMinValidToDate(nextDay);
                        }
                    }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Время"
                    dateFormat="dd/MM/yyyy HH:mm"
                    minDate={new Date()}
                    className={`date-picker ${errors.validFrom ? 'error' : ''}`}
                />
                {errors.validFrom && <span className="error-text">Выберите дату и время начала доступности</span>}
            </div>

            <div className="input-group">
                <label htmlFor="validTo">Доступно до:</label>
                <DatePicker
                    id="validTo"
                    selected={validTo}
                    onChange={(date) => setValidTo(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Время"
                    dateFormat="dd/MM/yyyy HH:mm"
                    minDate={minValidToDate}
                    className={`date-picker ${errors.validTo ? 'error' : ''}`}
                />
                {errors.validTo && <span className="error-text">Выберите дату и время окончания доступности</span>}
            </div>

            <button type="button" onClick={handleSubmit} className="submit-button">
                {selectedDishId ? 'Сохранить изменения' : 'Создать блюдо'}
            </button>
        </div>
    );
}

export default SetDishes;
