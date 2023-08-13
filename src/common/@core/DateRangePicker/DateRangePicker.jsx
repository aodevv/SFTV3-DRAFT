import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import Dropdown from "../../Dropdown/Dropdown";

import { useCloseOutside } from "../../Hooks/useCloseOutside";

import { getMonth, add0 } from "../utils/calendarFuncs.utils";

import { BsChevronLeft, BsChevronRight, BsChevronDown } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";

import "./DateRangePicker.scss";

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

const DateRangePicker = ({
  setDateRange,
  fetchViolations,
  resetViolation,
  workers,
  placeholder,
}) => {
  const [isClose, setIsClose] = useState(true);
  const [currentMonthData, setCurrentMonthData] = useState(getMonth());
  const [curMonth, setCurMonth] = useState(dayjs().month());
  const [curYear, setcurYear] = useState(dayjs().year());
  const [selecting, setSelecting] = useState(false);
  const [firstDate, setFirstDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);

  const [openRef, menuRef] = useCloseOutside(isClose, setIsClose);

  const prevMonth = () => {
    if (curMonth === 0) {
      setCurrentMonthData(getMonth(curYear - 1, 11));
      setCurMonth(11);
      setcurYear(curYear - 1);
    } else {
      setCurrentMonthData(getMonth(curYear, curMonth - 1));
      setCurMonth(curMonth - 1);
    }
  };

  const nextMonth = () => {
    if (curMonth === 11) {
      setCurrentMonthData(getMonth(curYear + 1, 0));
      setCurMonth(0);
      setcurYear(curYear + 1);
    } else {
      setCurrentMonthData(getMonth(curYear, curMonth + 1));
      setCurMonth(curMonth + 1);
    }
  };

  const handleDateSelection = (day) => {
    if (selecting) {
      setLastDate(day);
      setSelecting(false);
    } else {
      if (lastDate) {
        setLastDate(null);
      }
      setFirstDate(day);
      setSelecting(true);
    }
  };

  const handleApply = () => {
    if (firstDate && lastDate) {
      // setIsClose(true);
      if (workers) {
        setDateRange([firstDate.toDate(), lastDate.toDate()]);
      }

      if (fetchViolations) {
        fetchViolations({
          start_date: firstDate.format("YYYY-MM-DD"),
          end_date: lastDate.format("YYYY-MM-DD"),
        });
      }
    }
  };

  const resetRange = () => {
    if (firstDate && lastDate) {
      if (resetViolation) {
        resetViolation();
      }
    }
    setDateRange([]);
    setFirstDate(null);
    setLastDate(null);
    setIsClose(true);
  };

  useEffect(() => {
    setCurrentMonthData(getMonth());
  }, []);

  useEffect(() => {
    if (firstDate && lastDate) {
      if (firstDate.$d > lastDate.$d) {
        const temp = firstDate;
        setFirstDate(lastDate);
        setLastDate(temp);
        if (!workers) setDateRange([lastDate.toDate(), temp.toDate()]);
      } else {
        if (!workers) setDateRange([firstDate.toDate(), lastDate.toDate()]);
      }
    }
  }, [selecting]);

  return (
    <div className="rangepicker">
      <div
        ref={openRef}
        onClick={() => setIsClose(!isClose)}
        className="rangepicker__select"
      >
        <div className="rangepicker__select-dates">
          {!firstDate ? (
            <p className="placeholder">{placeholder}</p>
          ) : (
            <>
              {firstDate ? (
                <p>
                  {add0(firstDate.get("date"))}/
                  {add0(firstDate.get("month") + 1)}/{firstDate.get("year")}
                </p>
              ) : (
                <p>-/-/--</p>
              )}
              <div className="divider">•</div>
              {lastDate ? (
                <p>
                  {add0(lastDate.get("date"))}/{add0(lastDate.get("month") + 1)}
                  /{lastDate.get("year")}
                </p>
              ) : (
                <p>-/-/--</p>
              )}
            </>
          )}
        </div>
        <i className="date-chevron">
          <BiChevronDown />
        </i>
      </div>

      <Dropdown
        isClose={isClose}
        menuRef={menuRef}
        className="rangepicker__calendar"
      >
        <div className="rangepicker__calendar-header">
          <p>Date range</p>
          <div className="rangepicker__calendar-header__select">
            <p>Custom</p>
            <i>
              <BsChevronDown />
            </i>
          </div>
        </div>

        <div className="rangepicker__calendar-month__select">
          <i onClick={prevMonth}>
            <BsChevronLeft />
          </i>
          <p>
            {months[curMonth]} {curYear}
          </p>
          <i onClick={nextMonth}>
            <BsChevronRight />
          </i>
        </div>
        <div className="rangepicker__calendar-dates">
          <p>Mo</p>
          <p>Tu</p>
          <p>We</p>
          <p>Th</p>
          <p>Fr</p>
          <p>Sa</p>
          <p>Su</p>
          {currentMonthData.map((week, wkId) => {
            return week.map((day, dyId) => {
              return (
                <button
                  className={`${curMonth === day.month() && "active-month"}   ${
                    ((firstDate?.$d <= day && lastDate?.$d >= day.$d) ||
                      day === firstDate) &&
                    "selected"
                  } ${day === firstDate && lastDate && "first-selected"}
                  ${day === lastDate && "last-selected"}
                  ${day.day() === 1 && lastDate && "isMo-and-selected"}
                  ${day.day() === 0 && lastDate && "isSu-and-selected"}`}
                  key={`${wkId}-${dyId}`}
                  onClick={() => handleDateSelection(day)}
                >
                  {day.$D}
                </button>
              );
            });
          })}
        </div>
        <div className="rangepicker__btns">
          <button onClick={() => setIsClose(true)}>Cancel</button>
          <button onClick={resetRange}>Reset</button>
          <button disabled={!(firstDate && lastDate)} onClick={handleApply}>
            Apply
          </button>
        </div>
      </Dropdown>
    </div>
  );
};

export default DateRangePicker;
