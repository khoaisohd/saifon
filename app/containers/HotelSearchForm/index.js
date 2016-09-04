// Preload form assets
import 'containers/HotelSearchForm/CheckInPicker';
import 'containers/HotelSearchForm/CheckOutPicker';
import 'containers/HotelSearchForm/LocationPicker';
import 'containers/HotelSearchForm/TravellersPicker';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';
import styles from './styles.css';
import { pathToHotelSearch } from 'utils/routes-util';
import { getCheckIn, getCheckOut, getLocation, getRoomsCount, getGuestsCount } from './selectors';

class HotelSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { location, checkIn, checkOut, roomsCount, guestsCount } = this.props;

    return (
      <div>
        <div className={styles.toolbar}>
          <i className={appStyles.backButton} onClick={this.context.router.goBack} />
          Hotel Search
        </div>
        <div className={appStyles.containerBody}>
          <div>
            <Link to="/hotels/overlay/location-picker">{location.get('name')} - {location.get('code')}</Link>
          </div>
          <div>
            <div>
              <Link to="/hotels/overlay/check-in">{checkIn}</Link>
              ->
              <Link to="/hotels/overlay/check-out">{checkOut}</Link>
            </div>
          </div>
          <div>
            <Link to="/hotels/overlay/travellers-picker">
              {roomsCount} room{roomsCount > 1 ? 's' : ''} - {guestsCount} guest{guestsCount > 1 ? 's' : ''}
            </Link>
          </div>
          <Link to={pathToHotelSearch({ checkIn, checkOut, roomsCount, guestsCount, locationCode: location.get('code') })}>Searches</Link>
        </div>
      </div>
    );
  }
}

HotelSearchForm.propTypes = {
  location: PropTypes.object.isRequired,
  checkIn: PropTypes.string.isRequired,
  checkOut: PropTypes.string.isRequired,
  roomsCount: PropTypes.number.isRequired,
  guestsCount: PropTypes.number.isRequired,
};

HotelSearchForm.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = state => ({
  location: getLocation(state),
  checkIn: getCheckIn(state),
  checkOut: getCheckOut(state),
  roomsCount: getRoomsCount(state),
  guestsCount: getGuestsCount(state),
});

export default connect(mapStateToProps, null)(HotelSearchForm);
