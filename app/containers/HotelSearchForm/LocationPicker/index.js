import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateLocation } from '../actions';
import { fromJS } from 'immutable';
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
    this.props.updateLocation(fromJS(location));
    this.context.router.goBack();
  }

  render() {
    return (
      <div>
        <div className={styles.toolbar}>
          <div>
            Where
            <i className={styles.cancelIcon} onClick={this.context.router.goBack} />
          </div>
        </div>
        <div className={styles.inputContainer}>
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
  updateLocation: PropTypes.func.isRequired,
};

LocationPicker.contextTypes = {
  router: React.PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  updateLocation: location => dispatch(updateLocation(location)),
});

export default connect(null, mapDispatchToProps)(LocationPicker);
