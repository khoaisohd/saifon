import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { submitLocation } from '../actions';
import { fromJS } from 'immutable';
import appStyles from 'containers/App/styles.css';

class LocationPicker extends React.Component {
  submit() {
    const { submitLocation } = this.props;
    submitLocation(fromJS({
      code: 'SG',
      name: 'Singapore',
    }));
    this.context.router.goBack();
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

LocationPicker.propTypes = {
  submitLocation: PropTypes.func.isRequired,
};

LocationPicker.contextTypes = {
  router: React.PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  submitLocation: location => dispatch(submitLocation(location)),
});

export default connect(null, mapDispatchToProps)(LocationPicker);
