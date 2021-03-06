import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import appStyles from 'components/shared/styles.css';
import styles from './styles.css';
import { pathToHotelSearch } from 'helpers/routeHelper';
import { getCheckIn, getCheckOut, getLocation, getRoomsCount, getGuestsCount } from './selectors';
import moment from 'moment';
import { DATE_FORMAT } from 'helpers/dateHelper';

class HotelSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { location, checkIn, checkOut, roomsCount, guestsCount } = this.props;

    return (
      <div>
        <div className={styles.toolbar}>
          <i className={appStyles.backButton} onTouchTap={this.context.router.goBack} />
          Hotel Search
        </div>
        <div className={styles.container}>
          <div className={styles.link} onTouchTap={() => this.context.router.push('/hotels/modal/location-picker')}>
            {location.get('name')}
          </div>
          <div className={styles.link} onTouchTap={() => this.context.router.push('/hotels/modal/check-in')}>
            From: {moment(checkIn, DATE_FORMAT).format('MMM DD')}
          </div>
          <div className={styles.link} onTouchTap={() => this.context.router.push('/hotels/modal/check-out')}>
            To: {moment(checkOut, DATE_FORMAT).format('MMM DD')}
          </div>
          <div className={styles.link} onTouchTap={() => this.context.router.push('/hotels/modal/travellers-picker')}>
            {roomsCount} room{roomsCount > 1 ? 's' : ''} - {guestsCount} guest{guestsCount > 1 ? 's' : ''}
          </div>
          <div
            className={styles.searchButton}
            onTouchTap={() => this.context.router.push(pathToHotelSearch({
              checkIn,
              checkOut,
              roomsCount,
              guestsCount,
              locationCode: location.get('code'),
            }))}
          >
            Search
          </div>
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
