// Preload form assets

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';
import { submitSearch } from './actions';

class HotelSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { checkIn, checkOut, guestsCount, locationId, roomsCount } = props.routeParams;
    props.search({ checkIn, checkOut, guestsCount, locationId, roomsCount });
  }

  render() {
    const { hotels, location } = this.props;
    return (
      <div>
        <div className={appStyles.toolbar}>
          Result
        </div>
        <div className={appStyles.containerBody}>
          <div>
            <button>Sort</button>
          </div>
          <div>
            <Link to={`${location.pathname}/overlay/filters`}>Filter</Link>
          </div>
          <div>
            {hotels.map(hotel => <li key={hotel.get('id')}>{hotel.get('name')}</li>)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hotels: state.getIn(['HotelSearchResult', 'hotels']),
  sort: state.getIn(['HotelSearchResult', 'sort']),
});

const mapDispatchToProps = dispatch => ({
  search: search => dispatch(submitSearch(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchResult);
