import dayjs from "dayjs";

export const getMonth = (year = dayjs().year(), month = dayjs().month()) => {
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  const daysInMonth = dayjs(new Date(year, month, 1)).daysInMonth();
  let numOfWeeks = 5;
  let currentMonthCount;
  if (firstDayOfTheMonth === 0) {
    currentMonthCount = firstDayOfTheMonth - 6;
  } else {
    currentMonthCount = 1 - firstDayOfTheMonth;
  }

  if (
    (daysInMonth >= 30 && firstDayOfTheMonth === 0) ||
    (daysInMonth === 31 && firstDayOfTheMonth === 6)
  )
    numOfWeeks = 6;

  const daysMatrix = new Array(numOfWeeks).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return daysMatrix;
};

export const add0 = (str) => {
  if (str.toString().length === 1) return `0${str.toString()}`;
  return str.toString();
};

export const generateObjectOfYears = () => {
  const year = dayjs().year();
  const years = [];
  for (let i = 0; i < 110; i++) {
    const newYear = dayjs(new Date(year - i, 1, 1)).$y;
    years.push({ value: newYear, label: newYear });
  }

  return years;
};
