import React from 'react';
import { submitTiming } from '../actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

class HotelsSearchesFormDatePicker extends React.Component {
  submit() {
    const { submitTiming } = this.props;
    submitTiming('01-12-2016', '06-12-2016');
    browserHistory.goBack();
  }

  render() {
    return (
      <div>
        Select date
        <div>
          <button onClick={this.submit.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  submitTiming: (checkIn, checkOut) => dispatch(submitTiming(checkIn, checkOut)),
});

export default connect(null, mapDispatchToProps)(HotelsSearchesFormDatePicker);
