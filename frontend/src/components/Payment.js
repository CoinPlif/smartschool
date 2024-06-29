import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Payment.css';
import { Navigate } from 'react-router-dom';

function Payment() {
    const childId = localStorage.getItem("childId");
    const [orders, setOrders] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/orders/?children_id=${childId}`);
                const unpaidOrders = response.data.filter(order => !order.orders_if_paid);
                setOrders(unpaidOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [childId]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = selectedOrders.reduce((sum, order) => sum + order.orders_price, 0);
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [selectedOrders]);

    const handleOrderClick = (order) => {
        if (selectedOrders.includes(order)) {
            setSelectedOrders(selectedOrders.filter(o => o !== order));
        } else {
            setSelectedOrders([...selectedOrders, order]);
        }
    };

    const handleSubmitOrder = async () => {
        const orderIds = selectedOrders.map(order => order.id);
        const total = selectedOrders.reduce((sum, order) => sum + order.orders_price, 0);

        const checkDataToSend = {
            "orders_list": orderIds,
            "checks_price": total,
            "checks_children": Number(childId),
            "orders_list_str": "a",
        };

        try {
            await axios.post('http://localhost:8000/api/checks/', checkDataToSend);
            await Promise.all(
                selectedOrders.map(order =>
                    axios.patch(`http://localhost:8000/api/orders/${order.id}/`, { orders_if_paid: true })
                )
            );

            setRedirectTo("/paid");
        } catch (error) {
            console.error("Error submitting check and updating orders:", error);
        }
    };

    if (redirectTo) {
        return <Navigate to={redirectTo} />;
    };

    return (
        <div className="orders-container">
            {orders.map(order => (
                <button
                    key={order.id}
                    className={`order-button ${selectedOrders.includes(order) ? 'selected' : ''}`}
                    onClick={() => handleOrderClick(order)}
                >
                    <div>{order.orders_day_dt}</div>
                    <div>{order.orders_price} руб.</div>
                    <div>{order.orders_if_paid ? 'Оплачен' : 'Не оплачен'}</div>
                </button>
            ))}
            <div className="order-submit">
                <button 
                    className="submit-button" 
                    onClick={handleSubmitOrder} 
                    disabled={selectedOrders.length === 0}
                >
                    Подтвердить заказ ({totalPrice} руб.)
                </button>
            </div>
        </div>
    );
}

export default Payment;
