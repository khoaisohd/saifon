import React from 'react';
import { submitTiming } from '../actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import appStyles from 'containers/App/styles.css';

class DatePicker extends React.Component {
  submit() {
    const { submitTiming } = this.props;
    submitTiming('01-12-2016', '06-12-2016');
    browserHistory.goBack();
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


const mapDispatchToProps = dispatch => ({
  submitTiming: (checkIn, checkOut) => dispatch(submitTiming(checkIn, checkOut)),
});

export default connect(null, mapDispatchToProps)(DatePicker);