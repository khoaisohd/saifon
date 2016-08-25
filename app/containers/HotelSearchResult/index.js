import 'containers/HotelSearchResult/Filters'; // Preload form assets
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';
import { submitSearch } from './actions';
import { getHotelSearchPath } from 'utils/paths';

class HotelSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { checkIn, checkOut, guestsCount, locationCode, roomsCount } = props.routeParams;
    const search = { checkIn, checkOut, guestsCount, locationCode, roomsCount };
    this.filterPath = `${getHotelSearchPath(search)}/overlay/filters`;
    props.search(search);
  }

  render() {
    const { hotels } = this.props;

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
            <Link to={this.filterPath}>Filter</Link>
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
