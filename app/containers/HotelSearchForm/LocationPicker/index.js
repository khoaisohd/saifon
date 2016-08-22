import React from 'react';
import { connect } from 'react-redux';
import { submitLocation } from '../actions';
import { fromJS } from 'immutable';
import { browserHistory } from 'react-router'
import appStyles from 'containers/App/styles.css';

class LocationPicker extends React.Component {
  submit() {
    const { submitLocation } = this.props;
    submitLocation(fromJS({
      code: 'SG',
      name: 'Singapore'
    }));
    browserHistory.goBack();
  }

  render() {
    return (
      <div>
        <div className={appStyles.toolbar}>
          Select location
        </div>
        <div className={appStyles.containerBody}>
          <button onClick={this.submit.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submitLocation: location => dispatch(submitLocation(location)),
});

export default connect(null, mapDispatchToProps)(LocationPicker);