import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Navigate } from 'react-router-dom';

function Date() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = formatDate(date);
        localStorage.setItem('date', formattedDate);
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    if (selectedDate) {
        return (
            <div className="register-container">
                <Navigate to={`/breakfast`} />
            </div>
        );
    }

    return (
        <div>
            <h1>Выберете дату подбора меню</h1>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
            />
        </div>
    );
}

export default Date;
