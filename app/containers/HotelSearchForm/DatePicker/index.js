import React, { PropTypes } from 'react';
import { submitTiming } from '../actions';
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';

class DatePicker extends React.Component {
  submit() {
    const { submitTiming } = this.props;
    submitTiming('01-12-2016', '06-12-2016');
    this.context.router.goBack();
  }

  render() {
    return (
      <div>
        <div className={appStyles.toolbar}>Select date</div>
        <div className={appStyles.containerBody}>
          <button onClick={this.submit.bind(this)}>Submit</button>
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

const mapDispatchToProps = dispatch => ({
  submitTiming: (checkIn, checkOut) => dispatch(submitTiming(checkIn, checkOut)),
});

export default connect(null, mapDispatchToProps)(DatePicker);
