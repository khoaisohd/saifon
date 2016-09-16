// Preload form assets
import 'components/HotelSearchForm/CheckInPicker';
import 'components/HotelSearchForm/CheckOutPicker';
import 'components/HotelSearchForm/LocationPicker';
import 'components/HotelSearchForm/TravellersPicker';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import appStyles from 'components/shared/styles.css';
import styles from './styles.css';
import { pathToHotelSearch } from 'utils/routes-util';
import { getCheckIn, getCheckOut, getLocation, getRoomsCount, getGuestsCount } from './selectors';
import moment from 'moment';
import { DATE_FORMAT } from 'utils/dates';

class HotelSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { location, checkIn, checkOut, roomsCount, guestsCount } = this.props;

    return (
      <div>
        <div className={styles.toolbar}>
          <i className={appStyles.backButton} onClick={this.context.router.goBack} />
          Hotel Search
        </div>
        <div className={styles.container}>
          <Link className={styles.link} to="/hotels/modal/location-picker">{location.get('name')}</Link>
          <Link className={styles.link} to="/hotels/modal/check-in">From: {moment(checkIn, DATE_FORMAT).format('MMM DD')}</Link>
          <Link className={styles.link} to="/hotels/modal/check-out">To: {moment(checkOut, DATE_FORMAT).format('MMM DD')}</Link>
          <Link className={styles.link} to="/hotels/modal/travellers-picker">
            {roomsCount} room{roomsCount > 1 ? 's' : ''} - {guestsCount} guest{guestsCount > 1 ? 's' : ''}
          </Link>
          <Link
            className={styles.searchButton}
            to={pathToHotelSearch({
              checkIn,
              checkOut,
              roomsCount,
              guestsCount,
              locationCode: location.get('code'),
            })}
          >
            Search
          </Link>
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
