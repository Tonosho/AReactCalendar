import { useState } from 'react';
import { Days } from './Days';

import './Calendar.css';

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const todayDate = new Date();

export const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const selectedMonth = months[selectedDate.getMonth()]
    const selectedYear = selectedDate.getFullYear();

    const previousMonthClick = () => {
        setSelectedDate(
            new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() - 1,
                (selectedDate.getMonth() - 1) === todayDate.getMonth() && selectedDate.getFullYear() === todayDate.getFullYear() ? 
                todayDate.getDate() : 1))
    };

    const nextMonthClick = () => {
        setSelectedDate(
            new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                (selectedDate.getMonth() + 1) === todayDate.getMonth() && selectedDate.getFullYear() === todayDate.getFullYear() ? 
                todayDate.getDate() : 1))
    };

    return (
        <div className="calendar">
            <div className="calendar_header">
                <h2>Calendar</h2>
            </div>
            {/* TODAY'S DATE */}
            <div className="calendar_currentDate">
                <p>Date :</p>
                <p className="calendar_dateDisplay">{selectedDate.toLocaleDateString().replaceAll('/', ' / ')}</p>
            </div>
            {/* CALENDAR */}
            <div className="calendar_body">
                <div className="calendar_dateSelectContainer">
                    <p className="calendar_monthAndYear">{selectedMonth} {selectedYear}</p>
                    {/* Change months buttons */}
                    <div className="calendar_arrowsContainer">
                        <button
                            className="calendar_previousMonth" onClick={() => previousMonthClick()}
                        >
                            {"<"}
                        </button>
                        <button
                            className="calendar_nextMonth" onClick={() => nextMonthClick()}
                        >
                            {">"}
                        </button>
                    </div>
                </div>
                {/* Weeks header */}
                <div className="calendar_weekdaysHeader">
                    {weekDays.map((weekday, index) => {
                        return (
                            <div key={index}>{weekday}</div>
                        )
                    })}
                </div>
                {/* Days display */}
                <Days
                    selectedDate={selectedDate}
                    onChangeSelectedDate={(date: Date) => setSelectedDate(date)}
                />

                {/* SCHEDULE AND CANCEL BUTTONS */}
                <div className="calendar_scheduleContainer">
                    <button
                        className="calendar_scheduleButton"
                        onClick={() => alert(`Yous selected ${selectedDate.toLocaleDateString().replaceAll('/', ' / ')}`)}
                    >
                        Schedule
                    </button>
                    <button
                        className="calendar_cancelButton"
                        onClick={() => setSelectedDate(new Date())}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
