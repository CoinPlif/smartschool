import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './Date.css';

function DatePick() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [confirmedDate, setConfirmedDate] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [partialOrders, setPartialOrders] = useState([]);
    const [redirectTo, setRedirectTo] = useState(null);
    const today = new Date();
    const childId = localStorage.getItem('childId');

    useEffect(() => {
        const fetchBookedDates = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/brdishes/?br_child=${childId}`);
                const responseData = response.data;
                const dates = responseData.map(order => new Date(order.br_day));
                setBookedDates(dates);
            } catch (error) {
                console.error('Ошибка при загрузке забронированных дат:', error);
            }
        };

        const fetchCompletedOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/orders/?children_id=${childId}`);
                const responseData = response.data;
                const dates = responseData.map(order => new Date(order.orders_day_dt));
                setCompletedOrders(dates);
            } catch (error) {
                console.error('Ошибка при загрузке завершенных заказов:', error);
            }
        };

        const fetchPartialOrders = async () => {
            try {
                const [brResponse, lunResponse, dinResponse] = await Promise.all([
                    axios.get(`http://localhost:8000/api/brdishes/?br_child=${childId}`),
                    axios.get(`http://localhost:8000/api/lundishes/?lun_child=${childId}`),
                    axios.get(`http://localhost:8000/api/dindishes/?din_child=${childId}`)
                ]);

                const brDates = brResponse.data.map(order => new Date(order.br_day));
                const lunDates = lunResponse.data.map(order => new Date(order.lun_day));
                const dinDates = dinResponse.data.map(order => new Date(order.din_day));

                const allPartialDates = [...brDates, ...lunDates, ...dinDates];
                const uniquePartialDates = Array.from(new Set(allPartialDates.map(date => date.toDateString()))).map(date => new Date(date));
                setPartialOrders(uniquePartialDates);
            } catch (error) {
                console.error('Ошибка при загрузке частичных заказов:', error);
            }
        };

        fetchBookedDates();
        fetchCompletedOrders();
        fetchPartialOrders();
    }, [childId]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleConfirmDate = async () => {
        const formattedDate = formatDate(selectedDate);
        localStorage.setItem('date', formattedDate);
        setConfirmedDate(selectedDate);
    
        try {
            // Проверяем наличие завершенного заказа в localhost:8000/api/orders/
            const orderResponse = await axios.get(`http://localhost:8000/api/orders/?children_id=${childId}`);
            const hasCompletedOrder = orderResponse.data.some(order => {
                const orderDate = new Date(order.orders_day_dt);
                return (
                    orderDate.getDate() === selectedDate.getDate() &&
                    orderDate.getMonth() === selectedDate.getMonth() &&
                    orderDate.getFullYear() === selectedDate.getFullYear()
                );
            });
    
            if (hasCompletedOrder) {
                setRedirectTo('/order');
                return;
            }else{
                setRedirectTo('/breakfast');
                return;
            }
    
            
        } catch (error) {
            console.error('Ошибка при проверке заказов:', error);
        }
    };
    
    

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const getDayClassName = (date) => {
        const isCompleted = completedOrders.some(
            (completedDate) =>
                completedDate.getDate() === date.getDate() &&
                completedDate.getMonth() === date.getMonth() &&
                completedDate.getFullYear() === date.getFullYear()
        );

        if (isCompleted) {
            return 'completed-date';
        }

        const isPartial = partialOrders.some(
            (partialDate) =>
                partialDate.getDate() === date.getDate() &&
                partialDate.getMonth() === date.getMonth() &&
                partialDate.getFullYear() === date.getFullYear()
        );

        if (isPartial) {
            return 'partial-date';
        }

        return undefined;
    };

    if (redirectTo) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <div className="container">
            <h1>Выберете дату подбора меню</h1>
            <div className="datepicker-container">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Выберите дату"
                    minDate={today}
                    className="datepicker-input"
                    highlightDates={bookedDates}
                    dayClassName={getDayClassName}
                />
                <button
                    className="submit-button"
                    onClick={handleConfirmDate}
                    disabled={!selectedDate}
                >
                    Выбрать
                </button>
            </div>
        </div>
    );
}

export default DatePick;
