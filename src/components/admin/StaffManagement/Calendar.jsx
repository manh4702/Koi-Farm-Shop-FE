import React, { useState } from "react";
import dayjs from "dayjs";
import range from "lodash-es/range";
import "./style.scss";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ workSchedule }) => {
  const [dayObj, setDayObj] = useState(dayjs());

  const thisYear = dayObj.year();
  const thisMonth = dayObj.month(); // (January as 0, December as 11)
  const daysInMonth = dayObj.daysInMonth();

  const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`);
  const weekDayOf1 = dayObjOf1.day(); // (Sunday as 0, Saturday as 6)

  const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
  const weekDayOfLast = dayObjOfLast.day();

  const handlePrev = () => {
    setDayObj(dayObj.subtract(1, "month"));
  };

  const handleNext = () => {
    setDayObj(dayObj.add(1, "month"));
  };

  const isWorkday = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const scheduleDay = workSchedule.find((d) => d.date === formattedDate);
    return scheduleDay ? scheduleDay.status === "Làm việc" : null;
  };

  const isOffday = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const scheduleDay = workSchedule.find((d) => d.date === formattedDate);
    return scheduleDay ? scheduleDay.status === "Nghỉ phép" : null;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button type="button" className="nav nav--prev" onClick={handlePrev}>
          &lt;
        </button>
        <div className="datetime">{dayObj.format("MMM YYYY")}</div>
        <button type="button" className="nav nav--next" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <div className="week-container">
        {weekDays.map((d) => (
          <div className="week-cell" key={d}>
            {d}
          </div>
        ))}
      </div>
      <div className="day-container">
        {range(weekDayOf1).map((i) => (
          <div className="day-cell day-cell--faded" key={i}>
            {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
          </div>
        ))}

        {range(daysInMonth).map((i) => {
          const currentDate = dayObjOf1.add(i, "day");
          const isToday =
            i + 1 === dayjs().date() &&
            thisMonth === dayjs().month() &&
            thisYear === dayjs().year();
          const workday = isWorkday(currentDate);
          const offday = isOffday(currentDate);

          return (
            <div
              className={`day-cell day-cell--in-month${
                isToday ? " day-cell--today" : ""
              }${workday ? " day-cell--work" : ""}${
                offday ? " day-cell--off" : ""
              }`}
              key={i}
            >
              {i + 1}
            </div>
          );
        })}

        {range(6 - weekDayOfLast).map((i) => (
          <div className="day-cell day-cell--faded" key={i}>
            {dayObjOfLast.add(i + 1, "day").date()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
