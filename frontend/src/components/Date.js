import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './Date.css'; // Подключаем стили

function DatePick() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [confirmedDate, setConfirmedDate] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
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

        fetchBookedDates();
    }, [childId]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleConfirmDate = () => {
        const formattedDate = formatDate(selectedDate);
        localStorage.setItem('date', formattedDate);
        setConfirmedDate(selectedDate);
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    if (confirmedDate) {
        return (
            <div className="register-container">
                <Navigate to={`/breakfast`} />
            </div>
        );
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
                    minDate={today} // Устанавливаем минимальную дату как сегодня
                    className="datepicker-input"
                    highlightDates={bookedDates} // Подсвечиваем забронированные даты
                    dayClassName={(date) =>
                        bookedDates.some(
                            (bookedDate) =>
                                bookedDate.getDate() === date.getDate() &&
                                bookedDate.getMonth() === date.getMonth() &&
                                bookedDate.getFullYear() === date.getFullYear()
                        )
                            ? 'booked-date' // Класс для забронированных дат
                            : undefined
                    }
                />
                <button
                    className="submit-button"
                    onClick={handleConfirmDate}
                    disabled={!selectedDate} // Делаем кнопку неактивной, если дата не выбрана
                >
                    Выбрать
                </button>
            </div>
        </div>
    );
}

export default DatePick;
