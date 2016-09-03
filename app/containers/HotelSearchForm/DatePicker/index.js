import React, { PropTypes } from 'react';
import { submitTiming } from '../actions';
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';
import { DateRange } from 'react-date-range';
import theme from './theme';
import { getCheckIn, getCheckOut } from '../selectors';
import styles from './styles.css';

const format = 'DD-MM-YYYY';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.selectCheckOut = true;
  }

  submit() {
    const { submitTiming } = this.props;
    submitTiming('01-12-2016', '06-12-2016');
    this.context.router.goBack();
  }

  handleChange(range) {
    this.selectCheckOut = !this.selectCheckOut;
    if (this.selectCheckOut) {
      this.props.submitTiming(range.startDate.format(format), range.endDate.format(format));
      this.context.router.goBack();
    }
  }

  render() {
    const { checkIn, checkOut } = this.props;
    return (
      <div>
        <div className={styles.toolbar}>
          <i className={appStyles.backButton} onClick={this.context.router.goBack} />
          Check in - Check out
        </div>
        <div>
          <DateRange
            theme={theme}
            onChange={this.handleChange.bind(this)}
            startDate={checkIn}
            endDate={checkOut}
            calendars={1}
          />
        </div>
      </div>
    );
  }
}

DatePicker.propTypes = {
  submitTiming: PropTypes.func.isRequired,
};

DatePicker.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = state => ({
  checkIn: getCheckIn(state),
  checkOut: getCheckOut(state),
});

const mapDispatchToProps = dispatch => ({
  submitTiming: (checkIn, checkOut) => dispatch(submitTiming(checkIn, checkOut)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
