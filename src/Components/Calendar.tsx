import { useState } from "react";
import { Days } from "./Days";

import "./Calendar.css";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const todayDate = new Date();
const thisMonth = new Date(
  todayDate.getFullYear(),
  todayDate.getMonth(),
  1
).getTime();

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log("selecteddate", selectedDate.getMonth());
  const selectedMonth = months[selectedDate.getMonth()];
  const selectedYear = selectedDate.getFullYear();

  // Go to previous & compare dates
  const changeMonth = (increment: number) => {
    const selectedMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + increment,
      1
    ).getTime();

    const isThisMonth = selectedMonth === thisMonth;

    setSelectedDate(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + increment,
        isThisMonth ? todayDate.getDate() : 1
      )
    );
  };

  return (
    <div className="calendar">
      <div className="calendar_header">
        <h2>Calendar</h2>
      </div>
      {/* TODAY'S DATE */}
      <div className="calendar_currentDate">
        <p>Date :</p>
        <p className="calendar_dateDisplay">
          {selectedDate.toLocaleDateString().replaceAll("/", " / ")}
        </p>
      </div>
      {/* CALENDAR */}
      <div className="calendar_body">
        <div className="calendar_dateSelectContainer">
          <p className="calendar_monthAndYear">
            {selectedMonth} {selectedYear}
          </p>
          {/* Change months buttons */}
          <div className="calendar_arrowsContainer">
            <button
              className="calendar_previousMonth"
              onClick={() => changeMonth(-1)}
            >
              {"<"}
            </button>
            <button
              className="calendar_nextMonth"
              onClick={() => changeMonth(1)}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* Weeks header */}
        <div className="calendar_weekdaysHeader">
          {weekDays.map((weekday, index) => {
            return <div key={index}>{weekday}</div>;
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
            onClick={() =>
              alert(
                `Yous selected ${selectedDate
                  .toLocaleDateString()
                  .replaceAll("/", " / ")}`
              )
            }
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
