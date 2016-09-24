import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import styles from './index.css';
import getWeeks from '../getWeeks';
import CalendarDay from '../CalendarDay';

const CalendarWeek = (props) => {
  const { day, isPastWeek, currentMonth } = props;
  return (
    <div className={styles.week}>
      {props.week.map((day, i) => {
        const dayProps = {};
        if (day.isSame(moment(), 'day')) {
          dayProps.today = true;
        } else if (isPastWeek || moment().isAfter(day)) {
          dayProps.disabled = true;
        } else if (day.month() !== currentMonth.month()) {
          dayProps.concealed = true;
        }
        return (<CalendarDay key={`${day.format('DD-YY')}-${i}`} day={day} {...dayProps} />);
      })}
    </div>
  );
};

const WeekHeader = (props) => {
  const week = new Array(7).fill().map((val, i) => i);
  let currentDay = props.startDay;
  const key = `${currentDay.week()}-${currentDay.format('YY')}`;
  return (
    <div className={styles.weekHeader}>
      {week.map((i) => {
        const displayDay = (<div className={styles.dayHeader} key={`${key}-${i}`}>{currentDay.format('ddd')}</div>);
        currentDay = currentDay.clone().add(1, 'day');
        return displayDay;
      })}
    </div>
  );
};

class CalendarMonth extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { month, onClick } = this.props;
    const weeks = getWeeks(month);
    const key = `${month.format('DD')}-${month.format('YY')}`;
    return (
      <div className={styles.month}>
        <caption className={styles.monthLabel}>{month.format('MMMM YYYY')}</caption>
        <WeekHeader startDay={month.clone().startOf('week')} />
        {weeks.map((week, index) => {
          const isPastWeek = moment().isAfter(week[0]);
          return (
            <CalendarWeek
              week={week}
              key={`${key}-${index}`}
              onClick={onClick.bind(this)}
              isPastWeek={isPastWeek}
              currentMonth={month}
            />
            );
        })}
      </div>
    );
  }
}

CalendarMonth.propTypes = {
  month: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

CalendarMonth.defaultProps = {
  month: moment(),
  onClick: () => {},
};

export default CalendarMonth;

