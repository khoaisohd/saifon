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

class CalendarMonth extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { month } = this.props;
    const weeks = getWeeks(month);

    return (
      <div className={styles.month}>
        {weeks.map((week, i) =>
          <CalendarWeek week={week} key={i} />
        )}
      </div>
    );
  }
}

CalendarMonth.propTypes = {
  month: PropTypes.object.isRequired,
};

CalendarMonth.defaultProps = {
  month: moment(),
};

export default CalendarMonth;

