import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { submitLocation } from '../actions';
import { fromJS } from 'immutable';
import appStyles from 'containers/App/styles.css';
import styles from './styles.css';
import Api from 'sdk/Api';

class LocationPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      locations: [],
    };
  }

  handleInputChange(e) {
    const keyword = e.target.value;
    this.setState({ keyword });
    Api.searchHotelLocation(keyword).then(response => {
      this.setState({ locations: response.locations });
    });
  }

  handleSelectLocation(location) {
    this.props.submitLocation(fromJS(location));
    this.context.router.goBack();
  }

  render() {
    return (
      <div>
        <div className={appStyles.toolbar}>
          <i className={styles.backButton} onClick={this.context.router.goBack} />
          <input autoFocus className={styles.input} placeholder="Choose location" onChange={this.handleInputChange.bind(this)} />
        </div>
        <div>
          {this.state.locations.map(location =>
            (<div className={styles.location} key={location.code} onClick={() => this.handleSelectLocation(location)}>
              <span className={styles.locationCode}>{location.code}</span>
              <strong className={styles.locationName}>{location.name}</strong>
            </div>)
          )}
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
