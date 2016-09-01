import 'containers/HotelSearchResult/Filters'; // Preload form assets
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';
import { searchHotels } from './actions';
import { pathToHotelSearch } from 'utils/routes-util';
import HotelCard from 'components/HotelCard';
import { getDisplayedHotels, getSort, getLoading } from './selectors';

class HotelSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { checkIn, checkOut, guestsCount, locationCode, roomsCount } = this.props.routeParams;
    this.props.searchHotels({ checkIn, checkOut, guestsCount, locationCode, roomsCount });
  }

  render() {
    const { displayedHotels, loading } = this.props;
    const result = loading
      ? (<div>Loading...</div>)
      : displayedHotels.map(hotel => <HotelCard key={hotel.get('id')} hotel={hotel} />);

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
            {result}
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
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  displayedHotels: getDisplayedHotels(state),
  sort: getSort(state),
  loading: getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  searchHotels: search => dispatch(searchHotels(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchResult);
