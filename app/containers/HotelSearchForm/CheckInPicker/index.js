import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Calendar } from 'containers/shared/LegacyDatePicker';
import { getCheckIn, isCheckOutSelected } from '../selectors';
import { updateCheckIn } from '../actions';
import { DATE_FORMAT } from 'utils/dates';
import styles from './styles.css';
import appStyles from 'containers/App/styles.css';

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
        <div className={styles.toolbar}>
          Check in
          <i className={appStyles.cancelIcon} onClick={this.context.router.goBack} />
        </div>
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
