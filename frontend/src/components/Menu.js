import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';

function Menu() {
    const [orders, setOrders] = useState([]);
    const today = new Date();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/orders/');
                const ordersData = response.data.filter(order => order);
                ordersData.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
                setOrders(ordersData);
            } catch (error) {
                console.error('Ошибка при загрузке заказов:', error);
            }
        };

        fetchOrders();
    }, []);

    const getOrderButtonColor = (orderDate) => {
        const orderDateObj = new Date(orderDate);
        const differenceInDays = Math.floor((orderDateObj - today) / (1000 * 60 * 60 * 24));

        if (differenceInDays < 0) {
            return 'gray'; 
        } else if (differenceInDays >= 0 && differenceInDays <= 3) {
            return 'red';
        } else {
            return 'green'; 
        }
    };

    return (
        <div className="orders-container">
            <h1>Список заказов</h1>
            <div className="orders-list">
                {orders.map(order => (
                    <button
                        key={order.id}
                        className="order-button"
                        style={{ backgroundColor: getOrderButtonColor(order.order_date) }}
                    >
                        Заказ #{order.id} ({new Date(order.order_date).toLocaleDateString()})
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Menu;
