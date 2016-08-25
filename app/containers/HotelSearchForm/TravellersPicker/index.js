import React from 'react';
import { connect } from 'react-redux';
import { submitTravellers } from '../actions';
import appStyles from 'containers/App/styles.css';

class TravellersPicker extends React.Component {
  submit() {
    const { submitTravellers } = this.props;
    submitTravellers(2, 3);
    this.context.router.goBack();
  }

  render() {
    return (
      <div>
        <div className={appStyles.toolbar}>
          Select travel options
        </div>
        <div className={appStyles.containerBody}>
          <button onClick={this.submit.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

TravellersPicker.contextTypes = {
  router: React.PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  submitTravellers: (roomsCount, guestsCount) => dispatch(submitTravellers(roomsCount, guestsCount)),
});

export default connect(null, mapDispatchToProps)(TravellersPicker);
