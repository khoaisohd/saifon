import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';

class HotelsSearchesForm extends React.Component {
  render() {
    const { location, checkIn, checkOut, roomsCount, guestsCount } = this.props;
    const searchResultUrl = `/hotels/${location.get('code')}/${checkIn}/${checkOut}/${guestsCount}/${roomsCount}/`;

    return (
      <div>
        <div className={appStyles.toolbar}>
          Hotel Search Form
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
  location: state.getIn(['hotelsSearchesForm', 'location']),
  checkIn: state.getIn(['hotelsSearchesForm', 'checkIn']),
  checkOut: state.getIn(['hotelsSearchesForm', 'checkOut']),
  roomsCount: state.getIn(['hotelsSearchesForm', 'roomsCount']),
  guestsCount: state.getIn(['hotelsSearchesForm', 'guestsCount']),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(HotelsSearchesForm);
