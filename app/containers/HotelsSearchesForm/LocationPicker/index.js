import React from 'react';
import { connect } from 'react-redux';
import { submitLocation } from '../actions';
import { fromJS } from 'immutable';
import { RouterContext } from 'react-router';
import { browserHistory } from 'react-router'

class HotelsSearchesFormLocationPicker extends React.Component {
  submit() {
    this.props.submitLocation(fromJS({
      code: 'SG',
      name: 'Singapore'
    }));
    browserHistory.goBack();
  }

  render() {
    return (
      <div>
        Select location
        <div>
          <button onClick={this.submit.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submitLocation: location => dispatch(submitLocation(location)),
});

export default connect(null, mapDispatchToProps)(HotelsSearchesFormLocationPicker);
