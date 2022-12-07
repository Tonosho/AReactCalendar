import './Days.css';

const CALENDAR_GRID = 42;
// const grid = new Array(CALENDAR_GRID)

type DaysProps = {
  selectedDate: Date,
  onChangeSelectedDate: (date: Date) => void
}

export const Days = ({ selectedDate, onChangeSelectedDate } : DaysProps) => {

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  )

  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  const displayedDays = [];


  for (let cell =0; cell < CALENDAR_GRID; cell++) {
    if (cell === 0 && weekdayOfFirstDay === 0) {
      // Add top row in case first day of month is first day of week
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (cell === 0) {
      // Offset first day of month to correct day of the week
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - weekdayOfFirstDay);
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    const calendarDay = {
      date: new Date(firstDayOfMonth),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toLocaleDateString() === selectedDate.toLocaleDateString(),
      excluded: firstDayOfMonth.getMonth() !== selectedDate.getMonth(),
    }

    displayedDays.push(calendarDay)
  }

  return (
    <div className="days_container">
      {displayedDays.map((day, index) => {
        return (
          <div
            key={index}
            className={`days_day 
            ${day.selected ? "m-selected" : ""} 
            ${day.excluded ? "m-excluded" : ""}`}
            onClick={() => onChangeSelectedDate(day.date)}
          >
            {day.number}
          </div>
        )
      })}
    </div>
  );

};
