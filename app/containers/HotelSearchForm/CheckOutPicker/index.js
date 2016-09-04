import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Calendar } from 'react-date-range';
import { getCheckIn, getCheckOut } from '../selectors';
import { updateCheckOut } from '../actions';
import { DATE_FORMAT } from 'utils/dates';
import datePickerTheme from '../datePickerTheme';

class CheckOutPicker extends React.Component {
  handleChange(checkOut) {
    this.props.updateCheckOut(checkOut.format(DATE_FORMAT));
    this.context.router.goBack();
  }

  render() {
    const { checkIn, checkOut } = this.props;
    return (
      <Calendar
        onChange={this.handleChange.bind(this)}
        date={checkOut}
        minDate={checkIn}
        theme={datePickerTheme}
      />
    );
  }
}

CheckOutPicker.propTypes = {
  checkIn: PropTypes.string.isRequired,
  checkOut: PropTypes.string.isRequired,
  updateCheckOut: PropTypes.func.isRequired,
};

CheckOutPicker.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = state => ({
  checkIn: getCheckIn(state),
  checkOut: getCheckOut(state),
});

const mapDispatchToProps = dispatch => ({
  updateCheckOut: checkOut => dispatch(updateCheckOut(checkOut)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPicker);
