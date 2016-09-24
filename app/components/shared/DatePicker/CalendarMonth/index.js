import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import styles from './index.css';
import getWeeks from '../getWeeks';
import CalendarDay from '../CalendarDay';

const CalendarWeek = (props) => (
  <div className={styles.week}>
    {props.week.map((day, i) =>
      <CalendarDay key={i} day={day} />
    )}
  </div>
);

const WeekHeader = (props) => {
  const week = new Array(7).fill().map((val, i) => i);
  let currentDay = props.startDay;
  return (
    <div className={styles.weekHeader}>
      {week.map((i) => {
        const displayDay = (<div className={styles.dayHeader} key={i}>{currentDay.format('ddd')}</div>);
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

    return (
      <div className={styles.month}>
        <WeekHeader startDay={month.clone().startOf('week')} />
        {weeks.map((week, i) =>
          <CalendarWeek week={week} key={i} onClick={onClick.bind(this)} />
        )}
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

