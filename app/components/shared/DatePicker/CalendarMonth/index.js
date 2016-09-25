import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import styles from './index.css';
import getWeeks from '../getWeeks';
import CalendarDay from '../CalendarDay';

const CalendarWeek = (props) => {
  const { day, identifiers, onDayClick, selected } = props;
  return (
    <div className={styles.week}>
      {props.week.map((day, i) => (
        <CalendarDay
          key={`${day.format('DD-YY')}-${i}`} day={day}
          identifiers={identifiers}
          onDayClick={onDayClick}
          isSelected={selected && selected.isSame(day, 'day')}
        />
      ))}
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
        const displayDay = (
          <div className={styles.dayHeader} key={`${key}-${i}`}>
            {currentDay.format('ddd')}
          </div>);
        currentDay = currentDay.clone().add(1, 'day');
        return displayDay;
      })}
    </div>
  );
};

class CalendarMonth extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = { isSelectedMonth: false };
  }

  componentWillReceiveProps(nextProps) {
    const selectedDay = nextProps.selected;
    const month = nextProps.month;
    if (selectedDay && month.isSame(selectedDay, 'month')) {
      this.setState({ isSelectedMonth: true });
    } else {
      this.setState({ isSelectedMonth: false });
    }
  }

  shouldComponentUpdate(nextProps) {
    const affectedMonth = nextProps.selected.isSame(this.props.month, 'month');
    return affectedMonth || this.state.isSelectedMonth;
  }

  render() {
    const { month, onDayClick, identifiers, selected } = this.props;
    const weeks = getWeeks(month);
    const key = `${month.format('DD')}-${month.format('YY')}`;
    return (
      <div className={styles.month}>
        <caption className={styles.monthLabel}>{month.format('MMMM YYYY')}</caption>
        <WeekHeader startDay={month.clone().startOf('week')} />
        {weeks.map((week, index) => (
          <CalendarWeek
            week={week}
            key={`${key}-${index}`}
            identifiers={identifiers}
            onDayClick={onDayClick}
            selected={selected}
          />
        ))}
      </div>
    );
  }
}

CalendarMonth.propTypes = {
  month: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.object,
};

CalendarMonth.defaultProps = {
  month: moment(),
  onClick: () => {},
};

export default CalendarMonth;

