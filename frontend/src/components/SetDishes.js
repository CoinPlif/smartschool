import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SetDishes.css'; // Подключаем стили

function SetDishes() {
    const [types, setTypes] = useState([]);
    const [dishesType, setDishesType] = useState('');
    const [dishesName, setDishesName] = useState('');
    const [dishesDescription, setDishesDescription] = useState('');
    const [dishesCalories, setDishesCalories] = useState('');
    const [dishesPrice, setDishesPrice] = useState('');
    const [validFrom, setValidFrom] = useState(null);
    const [validTo, setValidTo] = useState(null);
    const [minValidToDate, setMinValidToDate] = useState(null); // Добавляем состояние для минимальной даты validTo

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/types/');
            setTypes(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке типов блюд:', error);
        }
    };

    const handleSubmit = async () => {
        const newDish = {
            dishes_type: dishesType,
            dishes_name: dishesName,
            dishes_description: dishesDescription,
            dishes_calories: dishesCalories,
            dishes_price: dishesPrice,
            valid_from_dttm: validFrom,
            valid_to_dttm: validTo,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/dishes/', newDish);
            console.log('Блюдо успешно создано:', response.data);
        } catch (error) {
            console.error('Ошибка при создании блюда:', error);
        }
    };

    return (
        <div className="create-dish-container">
            <h1>Создание блюда</h1>

            <div className="input-group">
                <label htmlFor="dishesType">Тип блюда:</label>
                <select id="dishesType" value={dishesType} onChange={(e) => setDishesType(e.target.value)}>
                    <option value="">Выберите тип блюда</option>
                    {types.map((type) => (
                        <option key={type.id} value={type.dishes_types_name}>
                            {type.dishes_types_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="input-group">
                <label htmlFor="dishesName">Название блюда:</label>
                <input
                    type="text"
                    id="dishesName"
                    value={dishesName}
                    onChange={(e) => setDishesName(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label htmlFor="dishesDescription">Описание блюда:</label>
                <textarea
                    id="dishesDescription"
                    value={dishesDescription}
                    onChange={(e) => setDishesDescription(e.target.value)}
                    rows={5}
                    className="fixed-height"
                />
            </div>

            <div className="input-group">
                <label htmlFor="dishesCalories">Калорийность:</label>
                <input
                    type="number"
                    id="dishesCalories"
                    value={dishesCalories}
                    onChange={(e) => setDishesCalories(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label htmlFor="dishesPrice">Цена (руб.):</label>
                <input
                    type="number"
                    id="dishesPrice"
                    value={dishesPrice}
                    onChange={(e) => setDishesPrice(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label htmlFor="validFrom">Доступно с:</label>
                <DatePicker
                    id="validFrom"
                    selected={validFrom}
                    onChange={(date) => {
                        setValidFrom(date);
                        // Устанавливаем минимальную дату для validTo на основе выбранной validFrom
                        if (date) {
                            const nextDay = new Date(date);
                            nextDay.setDate(nextDay.getDate() + 1); // Минимальная дата для validTo - следующий день после validFrom
                            setValidTo(null); // Сбрасываем значение validTo при изменении validFrom
                            setMinValidToDate(nextDay); // Устанавливаем минимальную дату для validTo
                        }
                    }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Время"
                    dateFormat="dd/MM/yyyy HH:mm"
                    minDate={new Date()}
                    className="date-picker"
                />
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
                    minDate={minValidToDate} // Используем переменную для минимальной даты validTo
                    className="date-picker"
                />
            </div>

            <button type="button" onClick={handleSubmit} className="submit-button">
                Создать блюдо
            </button>
        </div>
    );
}

export default SetDishes;
