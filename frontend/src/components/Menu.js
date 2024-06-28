import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Menu.css'; // Подключите стили

function Menu() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const childId = localStorage.getItem("childId");
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/orders/?children_id=${childId}`);
                const ordersData = response.data;
                ordersData.sort((a, b) => new Date(a.orders_day_dt) - new Date(b.orders_day_dt)); // Сортировка по дате
                setOrders(ordersData);
            } catch (error) {
                console.error('Ошибка при загрузке заказов:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleOrderClick = (orderDate) => {
        localStorage.setItem("date", orderDate);
        navigate(`/order`);
    };

    return (
        <div className="orders-container">
            <h1>Список заказов</h1>
            <div className="orders-list">
                {orders.map(order => (
                    <button
                        key={order.id}
                        className="order-button"
                        onClick={() => handleOrderClick(order.orders_day_dt)}
                    >
                        <span className="order-date">{new Date(order.orders_day_dt).toLocaleDateString()}</span>
                        <span className={`order-status ${order.orders_if_paid ? 'paid' : 'not-paid'}`}>
                            {order.orders_if_paid ? 'Оплачен' : 'Не оплачен'}
                        </span>
                        <span className="order-price">{order.orders_price} руб.</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Menu;
