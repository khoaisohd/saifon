import 'containers/HotelSearchResult/Filters'; // Preload form assets
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';
import styles from './styles.css';
import { fetchHotels } from '../actions';
import { pathToHotelSearch } from 'utils/routes-util';
import HotelCard from 'components/HotelCard';
import { getDisplayedHotels, getSort, isLoading } from '../selectors';
import moment from 'moment';
import { DATE_FORMAT } from 'utils/dates';

class Results extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { checkIn, checkOut, guestsCount, locationCode, roomsCount } = this.props.searchParams;
    this.props.fetchHotels({ checkIn, checkOut, guestsCount, locationCode, roomsCount });
  }

  render() {
    const { displayedHotels, searchParams, isLoading } = this.props;
    const { locationCode, checkIn, checkOut } = searchParams;
    const result = isLoading
      ? (<div>Loading...</div>)
      : displayedHotels.map(hotel => <HotelCard key={hotel.get('id')} hotel={hotel} />);

    return (
      <div>
        <div className={appStyles.toolbar}>
          <i className={appStyles.backButton} onClick={this.context.router.goBack} />
          <div>
            <div className={styles.locationCode}>{locationCode}</div>
            <div className={styles.checkInCheckOut}>
              {moment(checkIn, DATE_FORMAT).format('MMM DD')} - {moment(checkOut, DATE_FORMAT).format('MMM DD')}
            </div>
          </div>
        </div>
        <div className={styles.buttonRow}>
          <button className={styles.sortButton}>
            Sort
            <i className={styles.dropDownIcon}></i>
          </button>
          <Link className={styles.filterButton} to={`${pathToHotelSearch(searchParams)}/overlay/filters`}>
            Filter
            <i className={styles.filterIcon}></i>
          </Link>
        </div>
        <div>
          {result}
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

Results.contextTypes = {
  router: React.PropTypes.object,
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
