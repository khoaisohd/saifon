import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';

class HotelsSearchesForm extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        Hotel Search Form
        <div>
          <Link to="/hotels/overlay/location-picker">Location</Link>
          <div>{location.get('name')}</div>
        </div>
        <div>
          <Link to="/hotels/overlay/date-picker">Check in && Check out</Link>
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
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(HotelsSearchesForm);
