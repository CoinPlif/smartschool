import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css'; // Подключаем стили
import { Navigate } from 'react-router-dom';

function Order() {
    const childId = localStorage.getItem("childId");
    const date = localStorage.getItem("date");
    const [brId, setBrId] = useState(0);
    const [lunId, setLunId] = useState(0);
    const [dinId, setDinId] = useState(0);
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
        const fetchDishDetails = async (dishId) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/dishes/${dishId}/`);
                return response.data;
            } catch (error) {
                console.error("Error fetching dish details:", error);
                return null;
            }
        };

        const fetchBreakfast = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/brdishes/?br_child=${childId}&br_day=${date}`);
                if (response.data.length > 0){
                    const { br_drink, br_main, br_addition } = response.data[0];
                    setBrId(response.data[0].id);
                    const br_arr = [br_drink, br_main, br_addition];
                    const breakfastDetails = await Promise.all(br_arr.filter(Boolean).map(fetchDishDetails));
                    setBreakfast(breakfastDetails.filter(Boolean));
                }
            } catch (error) {
                console.error("Error fetching breakfast:", error);
            }
        };

        const fetchLunch = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/lundishes/?lun_child=${childId}&lun_day=${date}`);
                if (response.data.length > 0){
                    const { lun_drink, lun_first, lun_main, lun_garnish, lun_addition } = response.data[0];
                    setLunId(response.data[0].id);
                    const lun_arr = [lun_drink, lun_first, lun_main, lun_garnish, lun_addition];
                    const lunchDetails = await Promise.all(lun_arr.filter(Boolean).map(fetchDishDetails));
                    setLunch(lunchDetails.filter(Boolean));
                }
            } catch (error) {
                console.error("Error fetching lunch:", error);
            }
        };

        const fetchDinner = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/dindishes/?din_child=${childId}&din_day=${date}`);
                if (response.data.length > 0){
                    const { din_drink, din_main, din_garnish, din_addition } = response.data[0];
                    setDinId(response.data[0].id);
                    const din_arr = [din_drink, din_main, din_garnish, din_addition];
                    const dinnerDetails = await Promise.all(din_arr.filter(Boolean).map(fetchDishDetails));
                    setDinner(dinnerDetails.filter(Boolean));
                }
            } catch (error) {
                console.error("Error fetching dinner:", error);
            }
        };

        fetchBreakfast();
        fetchLunch();
        fetchDinner();
    }, []);

    const handleMealClick = (path) => {
        setRedirectTo(path);
    };

    useEffect(() => {
        const calculateTotalPrice = () => {
            const breakfastPrice = calculateMealTotalPrice(breakfast);
            const lunchPrice = calculateMealTotalPrice(lunch);
            const dinnerPrice = calculateMealTotalPrice(dinner);
            return breakfastPrice + lunchPrice + dinnerPrice;
        };

        const calculateMealTotalPrice = (meal) => {
            return meal.reduce((sum, dish) => sum + dish.dishes_price, 0);
        };

        const total = calculateTotalPrice();
        setTotalPrice(total);
    }, [breakfast, lunch, dinner]);

    const handleSubmitOrder = async () => {
        const ordersDataToSend = {
            orders_breakfast_id: brId,
            orders_lunch_id: lunId,
            orders_dinner_id: dinId,
            orders_price: totalPrice,
            children_id: childId,
            orders_day_dt: date
        };

        console.log("ordersDataToSend", ordersDataToSend);

        try {
            const existingResponse = await axios.get('http://localhost:8000/api/orders/');
            const existingItem = existingResponse.data.find(item => item.orders_day_dt === date && Number(item.children_id) === Number(childId));
            if (!existingItem) {
                const response = await axios.post('http://localhost:8000/api/orders/', ordersDataToSend);
                console.log("Order submitted successfully:", response.data);
            }
        } catch (error) {
            console.error("Error submitting order:", error);
        }
    };


    const renderMealButton = (meal, title, path) => {
        const totalPrice = meal.reduce((sum, dish) => sum + dish.dishes_price, 0);
        return (
            <div className="meal">
                <button className="meal-button" onClick={() => handleMealClick(path)}>
                    <div className="meal-title">{title}</div>
                    <div className="dish-list">
                        {meal.length > 0 ? (
                            meal.map((dish, index) => (
                                <div key={index} className="dish-item">
                                    <span>{dish.dishes_name}</span>
                                    <span>{dish.dishes_price} руб.</span>
                                </div>
                            ))
                        ) : (
                            <p>Не выбрано</p>
                        )}
                    </div>
                </button>
            </div>
        );
    };

    if (redirectTo) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <div className="orders-container">
            {renderMealButton(breakfast, 'Завтрак', '/breakfast')}
            {renderMealButton(lunch, 'Обед', '/lunch')}
            {renderMealButton(dinner, 'Ужин', '/dinner')}
            <div className="order-submit">
                <button className="submit-button" onClick={handleSubmitOrder}>
                    Подтвердить заказ ({totalPrice} руб.)
                </button>
            </div>
        </div>
    );
}

export default Order;
