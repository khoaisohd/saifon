import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Calendar } from 'components/shared/LegacyDatePicker';
import { getCheckIn, isCheckOutSelected } from '../selectors';
import { updateCheckIn } from '../actions';
import { DATE_FORMAT } from 'helpers/dateHelper';
import ModalHeader from 'components/shared/ModalHeader';

class CheckInPicker extends React.Component {
  handleChange(checkIn) {
    const { isCheckOutSelected, updateCheckIn } = this.props;
    updateCheckIn(checkIn.format(DATE_FORMAT));
    if (isCheckOutSelected) {
      this.context.router.goBack();
    } else {
      this.context.router.replace('/hotels/modal/check-out');
    }
  }

  render() {
    return (
      <div>
        <ModalHeader title="Check in" />
        <Calendar
          onChange={this.handleChange.bind(this)}
          date={this.props.checkIn}
        />
      </div>
    );
  }
}

CheckInPicker.propTypes = {
  checkIn: PropTypes.string.isRequired,
  updateCheckIn: PropTypes.func.isRequired,
  isCheckOutSelected: PropTypes.bool.isRequired,
};

CheckInPicker.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = state => ({
  checkIn: getCheckIn(state),
  isCheckOutSelected: isCheckOutSelected(state),
});

const mapDispatchToProps = dispatch => ({
  updateCheckIn: checkIn => dispatch(updateCheckIn(checkIn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckInPicker);
