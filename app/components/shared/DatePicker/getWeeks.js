
const getWeek = (day) => {
  const firstDay = day.clone().startOf('week');
  const week = new Array(7).fill().map((val, i) => i);
  return week.map((day, index) =>
    firstDay.clone().add(index, 'days')
  );
};

const getWeeks = (month) => {
  // set utc offset to get correct dates in future (when timezone changes)
  const baseDate = month.clone().utcOffset(month.utcOffset());
  const firstDayOfMonth = baseDate.clone().startOf('month');
  const lastDayOfMonth = baseDate.clone().endOf('month');

  const weeks = [];

  let lastWeekOfMonth = false;
  let baseDay = firstDayOfMonth;
  while (!lastWeekOfMonth) {
    const currentWeek = getWeek(baseDay);
    weeks.push(currentWeek);
    const lastDayOfWeek = currentWeek[6];
    baseDay = lastDayOfWeek.clone().add(1, 'days');
    lastWeekOfMonth = lastDayOfWeek.diff(lastDayOfMonth, 'days') >= 0;
  }

  return weeks;
};

export default getWeeks;
