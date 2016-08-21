import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';

class HotelsSearchesForm extends React.Component {
  render() {
    const { location, checkIn, checkOut } = this.props;
    return (
      <div>
        Hotel Search Form
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.getIn(['hotelsSearchesForm', 'location']),
  checkIn: state.getIn(['hotelsSearchesForm', 'checkIn']),
  checkOut: state.getIn(['hotelsSearchesForm', 'checkOut']),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(HotelsSearchesForm);
