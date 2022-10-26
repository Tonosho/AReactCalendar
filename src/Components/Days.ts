import { useState } from 'react';
import './Days.css';

export const Days = () => {
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      ))

    for (let day = 0; day < CALENDAR_GRID; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
          // Add top row in case first day of month is first day of week
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
          // Offset first day of month to correct day of the week
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() - weekdayOfFirstDay);
        } else {
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }
    }

    return (
        <div className="days_container">
            <div className="days_day">
                
            </div>

        </div>
    );

};

/*
import "./Days.css";

// Calendar is a 7 X 6 grid
const CALENDAR_GRID = 42;

type CalendarDaysProps = {
  selectedDate: Date;
  onChangeSelectedDate: (date: Date) => void;
};

export const Days = ({
  selectedDate,
  onChangeSelectedDate,
}: CalendarDaysProps) => {
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  const currentDays = [];
  
  // TODO Simplify
  for (let day = 0; day < CALENDAR_GRID; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      // Add top row in case first day of month is first day of week
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      // Offset first day of month to correct day of the week
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - weekdayOfFirstDay);
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    const calendarDay = {
      id: day,
      currentMonth: firstDayOfMonth.getMonth() === selectedDate.getMonth(),
      date: new Date(firstDayOfMonth),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === selectedDate.toDateString(),
    };

    currentDays.push(calendarDay);
  }

  return (
    <div className="Days__container">
      {currentDays.map((day) => {
        return (
          <div
            key={day.id}
            className={`Days__day 
            ${day.currentMonth ? "m-currentMonth" : ""}
            ${day.selected ? "m-selected" : ""}`}
            onClick={() => onChangeSelectedDate(day.date)}
          >
            <p className="Days__dayNumber">{day.number}</p>
          </div>
        );
      })}
    </div>
  );
};
