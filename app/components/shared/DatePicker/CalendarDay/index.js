import React, { PropTypes } from 'react';
import moment from 'moment';
import styles from './index.css';

const CalendarDay = (props) => {
  const { day } = props;
  let className;
  if (props.selected) {
    className = styles.selected;
  } else if (props.highlighted) {
    className = styles.highlited;
  } else if (props.holiday) {
    className = styles.holiday;
  } else if (props.weekend) {
    className = styles.weekend;
  } else if (props.today) {
    className = styles.today;
  } else if (props.disabled) {
    className = styles.disabled;
  } else {
    className = styles.day;
  }
  return (
    <div className={className}>
      {day.format('D')}
    </div>
  );
};

CalendarDay.propTypes = {
  day: PropTypes.object,
};

CalendarDay.defaultProps = {
  day: moment(),
};

export default CalendarDay;

