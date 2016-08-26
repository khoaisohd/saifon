// Preload form assets
import 'containers/HotelSearchForm/DatePicker';
import 'containers/HotelSearchForm/LocationPicker';
import 'containers/HotelSearchForm/TravellersPicker';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';
import { pathToHotelSearch } from 'utils/routes-util';

class HotelSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { location, checkIn, checkOut, roomsCount, guestsCount } = this.props;
    const searchResultUrl = pathToHotelSearch({ locationCode: location.get('code'), checkIn, checkOut, roomsCount, guestsCount });

    return (
      <div>
        <div className={appStyles.toolbar}>
          Hotel Search
        </div>
        <div className={appStyles.containerBody}>
          <div>
            <Link to="/hotels/overlay/location-picker">Location</Link>
            <div>{location.get('name')} - {location.get('code')}</div>
          </div>
          <div>
            <Link to="/hotels/overlay/date-picker">Check in && Check out</Link>
            <div>{checkIn} -> {checkOut}</div>
          </div>
          <div>
            <Link to="/hotels/overlay/travellers-picker">Travellers Options</Link>
            <div>{roomsCount} - {guestsCount}</div>
          </div>
          <Link to={searchResultUrl}>Searches</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.getIn(['HotelSearchForm', 'location']),
  checkIn: state.getIn(['HotelSearchForm', 'checkIn']),
  checkOut: state.getIn(['HotelSearchForm', 'checkOut']),
  roomsCount: state.getIn(['HotelSearchForm', 'roomsCount']),
  guestsCount: state.getIn(['HotelSearchForm', 'guestsCount']),
});

export default connect(mapStateToProps, null)(HotelSearchForm);
