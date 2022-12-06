import { useState } from 'react';
import { Days } from './Days';

import './Calendar.css';

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const todayDate = new Date();

export const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    console.log("selecteddate", selectedDate.getMonth());
    const selectedMonth = months[selectedDate.getMonth()]
    const selectedYear = selectedDate.getFullYear();

    // Go to previous & compare dates
    const previousMonthClick = () => {
        const currentYear = todayDate.getFullYear();
        const previousYear = selectedDate.getFullYear() - 1;
        const selectedYear = selectedDate.getFullYear();
        const currentMonth = todayDate.getMonth();
        const previousMonth = selectedDate.getMonth() - 1;

        setSelectedDate(
            new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() - 1,
                previousMonth === currentMonth && selectedYear === currentYear ||
                    previousMonth === -1 && currentMonth === 11 && previousYear === currentYear ?
                    todayDate.getDate() : 1
            ))
    };

    // Go to next month & compare dates
    const nextMonthClick = () => {
        const currentYear = todayDate.getFullYear();
        const nextYear = selectedDate.getFullYear() + 1;
        const selectedYear = selectedDate.getFullYear();
        const currentMonth = todayDate.getMonth();
        const nextMonth = selectedDate.getMonth() + 1;

        setSelectedDate(
            new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                nextMonth === currentMonth && selectedYear === currentYear ||
                nextMonth === 12 && currentMonth === 0 && nextYear === currentYear ?
                todayDate.getDate() : 1
            ))
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
