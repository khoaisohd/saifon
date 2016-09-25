import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import CalendarMonth from './CalendarMonth';

class DatePicker extends Component {

  constructor(props) {
    super(props);
    this.state = { today: moment(), selected: props.selected };
    this.onDayClick = this.onDayClick.bind(this);
  }

  onDayClick(day) {
    this.setState({ selected: day });
  }

  getDayIdentifiers() {
    return {
      holiday: day => this.isHoliday(day),
      disabled: day => this.isDisabled(day),
    };
  }

  isDisabled(day) {
    return this.state.today.isAfter(day, 'day');
  }

  isHoliday() {
    return false;
  }

  render() {
    const months = new Array(12).fill().map((val, i) => i);
    const { selected } = this.state;
    return (
      <div>
        { months.map((i) => {
          const currentMonth = moment().add(i, 'month');
          const selectedProp = selected ? { selected } : {};
          return (
            <div key={i} >
              <CalendarMonth
                month={currentMonth}
                identifiers={this.getDayIdentifiers()}
                onDayClick={this.onDayClick}
                {...selectedProp}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

DatePicker.propTypes = {
  selected: PropTypes.object,
};

DatePicker.defaultProps = {
  selected: moment(),
};

export default DatePicker;
