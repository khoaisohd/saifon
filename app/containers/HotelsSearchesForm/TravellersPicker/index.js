import React from 'react';
import { connect } from 'react-redux';
import { submitTravellers } from '../actions';
import { fromJS } from 'immutable';
import { browserHistory } from 'react-router'

class HotelsSearchesFormTravellersPicker extends React.Component {
  submit() {
    const { submitTravellers } = this.props;
    submitTravellers(2, 3);
    browserHistory.goBack();
  }

  render() {
    return (
      <div>
        Select travel options
        <div>
          <button onClick={this.submit.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submitTravellers: (roomsCount, guestsCount) => dispatch(submitTravellers(roomsCount, guestsCount)),
});

export default connect(null, mapDispatchToProps)(HotelsSearchesFormTravellersPicker);
