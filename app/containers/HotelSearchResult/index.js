import 'containers/HotelSearchResult/Filters'; // Preload form assets
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';
import { searchHotels } from './actions';
import { pathToHotelSearch } from 'utils/routes-util';
import HotelCard from 'components/HotelCard';

class HotelSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { checkIn, checkOut, guestsCount, locationCode, roomsCount } = props.routeParams;
    props.searchHotels({ checkIn, checkOut, guestsCount, locationCode, roomsCount });
  }

  render() {
    const { displayedHotels } = this.props;
    return (
      <div>
        <div className={appStyles.toolbar}>
          Result
        </div>
        <div>
          <div>
            <button>Sort</button>
          </div>
          <div>
            <Link to={`${pathToHotelSearch(this.props.routeParams)}/overlay/filters`}>Filter</Link>
          </div>
          <div>
            {displayedHotels.map(hotel => <HotelCard key={hotel.get('id')} hotel={hotel} />)}
          </div>
        </div>
      </div>
    );
  }
}

HotelSearchResult.propTypes = {
  displayedHotels: PropTypes.object.isRequired,
  sort: PropTypes.object.isRequired,
  searchHotels: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  displayedHotels: state.getIn(['HotelSearchResult', 'displayedHotels']),
  sort: state.getIn(['HotelSearchResult', 'sort']),
});

const mapDispatchToProps = dispatch => ({
  searchHotels: search => dispatch(searchHotels(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchResult);
