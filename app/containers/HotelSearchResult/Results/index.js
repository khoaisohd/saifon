import 'containers/HotelSearchResult/Filters'; // Preload form assets
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';
import { fetchHotels } from '../actions';
import { pathToHotelSearch } from 'utils/routes-util';
import HotelCard from 'components/HotelCard';
import { getDisplayedHotels, getSort, isLoading } from '../selectors';

class Results extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { checkIn, checkOut, guestsCount, locationCode, roomsCount } = this.props.searchParams;
    this.props.fetchHotels({ checkIn, checkOut, guestsCount, locationCode, roomsCount });
  }

  render() {
    const { displayedHotels, searchParams, isLoading } = this.props;
    const result = isLoading
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
            <Link to={`${pathToHotelSearch(searchParams)}/overlay/filters`}>Filter</Link>
          </div>
          <div>
            {result}
          </div>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  displayedHotels: PropTypes.object.isRequired,
  sort: PropTypes.object.isRequired,
  fetchHotels: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  displayedHotels: getDisplayedHotels(state),
  sort: getSort(state),
  isLoading: isLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchHotels: search => dispatch(fetchHotels(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
