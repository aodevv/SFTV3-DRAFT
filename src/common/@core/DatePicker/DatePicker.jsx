import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { useCloseOutside } from '../../Hooks/useCloseOutside';
import Dropdown from '../../Dropdown/Dropdown';

import {
  getMonth,
  add0,
  generateObjectOfYears,
} from '../utils/calendarFuncs.utils';

import Select from 'react-select';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';

import './DatePicker.scss';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const years = generateObjectOfYears();

const DatePicker = ({
  changeHandler,
  error,
  value,
  touched,
  isRight,
  centerRight,
  disabled,
}) => {
  const [isClose, setIsClose] = useState(true);
  const [currentMonthData, setCurrentMonthData] = useState(getMonth());
  const [curMonth, setCurMonth] = useState(dayjs().month());
  const [curYear, setcurYear] = useState(dayjs().year());
  const [date, setDate] = useState(value ? dayjs(value) : value);
  const [selectYear, setSelectYear] = useState(null);

  //handeling div focus to check whether the element has been touched
  // const [clicked, setClicked] = useState(false);
  // const [isFocused, setIsFocused] = useState(false);
  // const selectRef = useRef(null);

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

  const prevYear = () => {
    setCurrentMonthData(getMonth(curYear - 1, curMonth));
    setcurYear(curYear - 1);
  };

  const nextYear = () => {
    setCurrentMonthData(getMonth(curYear + 1, curMonth));
    setcurYear(curYear + 1);
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
    if (date !== day) {
      changeHandler(day.toDate().toISOString());
      setDate(day);
    }
  };

  const handleSelectClick = () => {
    if (!disabled) {
      setIsClose(!isClose);
    }
  };

  useEffect(() => {
    setCurrentMonthData(getMonth());
  }, []);

  useEffect(() => {
    if (selectYear) {
      setcurYear(selectYear.value);
      setCurrentMonthData(getMonth(selectYear.value, curMonth));
    }
  }, [selectYear]);

  useEffect(() => {
    setDate(value ? dayjs(value) : value);
  }, [value]);

  return (
    <div className="datepicker">
      <div
        ref={openRef}
        onClick={handleSelectClick}
        className={`datepicker__select ${error && touched && 'has-error'}  ${
          disabled && 'datepicker__select-disabled'
        }`}
      >
        <div className="datepicker__select-dates">
          {date ? (
            <p>
              {add0(date.get('date'))}/{add0(date.get('month') + 1)}/
              {date.get('year')}
            </p>
          ) : (
            <p>-/-/--</p>
          )}
        </div>
        <i>
          <BiCalendar />
        </i>
      </div>
      {error && touched && <p className="date-error">{error}</p>}

      <Dropdown
        isClose={isClose}
        menuRef={menuRef}
        right={'-10px'}
        left={220}
        top={centerRight ? -280 : undefined}
        portal={centerRight}
        className={`datepicker__calendar ${isRight && 'isRight'}`}
      >
        <div className="datepicker__calendar-header">
          <p>Select year</p>
          <div className="datepicker__calendar-header__select">
            <Select
              maxMenuHeight={200}
              options={years}
              placeholder="Year"
              value={selectYear}
              onChange={(selectedOption) => setSelectYear(selectedOption)}
              classNamePrefix="react-select"
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  height: '36px',
                  cursor: 'pointer',
                }),
              }}
            />
          </div>
        </div>

        <div className="datepicker__calendar-month__select">
          <i onClick={prevYear}>
            <AiOutlineDoubleLeft />
          </i>
          <i onClick={prevMonth}>
            <BsChevronLeft />
          </i>
          <p>
            {months[curMonth]} {curYear}
          </p>
          <i onClick={nextMonth}>
            <BsChevronRight />
          </i>
          <i onClick={nextYear}>
            <AiOutlineDoubleRight />
          </i>
        </div>
        <div className="datepicker__calendar-dates">
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
                  type="button"
                  className={`${curMonth === day.month() && 'active-month'}   ${
                    day.$D === date?.$D &&
                    day.$M === date?.$M &&
                    day.$y === date?.$y &&
                    'selected'
                  }`}
                  key={`${wkId}-${dyId}`}
                  onClick={() => handleDateSelection(day)}
                >
                  {day.$D}
                </button>
              );
            });
          })}
        </div>
        {/* <div className="datepicker__btns">
          <button>Cancel</button>
          <button>Apply</button>
        </div> */}
      </Dropdown>
    </div>
  );
};

export default DatePicker;
