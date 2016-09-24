import React, { PropTypes } from 'react';
import moment from 'moment';
import styles from './index.css';

const getDayIdentifiers = (identifiers, day) => (day ? Object.keys(identifiers).filter(key => identifiers[key](day)) : []);

const getClassNames = (dayProperties = []) => (dayProperties.map((dayProperty) => styles[dayProperty]));

const CalendarDay = (props) => {
  const { day, identifiers, onDayClick, isSelected } = props;
  const dayProperties = getDayIdentifiers(identifiers, day);
  const classNames = getClassNames(dayProperties);
  const identifierClasses = classNames.length > 0 ? classNames.join(' ') : styles.day;
  const selectedClass = isSelected ? styles.selected : '';

  return (
    <div className={`${selectedClass} ${identifierClasses}`} onClick={() => onDayClick(day)} >
      {day.format('D')}
    </div>
  );
};

CalendarDay.propTypes = {
  day: PropTypes.object.isRequired,
  identifiers: PropTypes.object,
};

CalendarDay.defaultProps = {
  day: moment(),
  identifiers: {},
};

export default CalendarDay;

