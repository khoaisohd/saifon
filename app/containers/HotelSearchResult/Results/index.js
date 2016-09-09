import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';
import styles from './styles.css';
import { fetchHotels, loadMore } from '../actions';
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

  selectSort(e) {
    console.log('sort', e.target.value);
  }

  render() {
    const { searchParams, isLoading, loadMore, displayedHotels } = this.props;
    const { locationCode, checkIn, checkOut } = searchParams;

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
          <div className={styles.sortButton}>
            <span className={styles.sortLabel}>
              Sort
              <i className={styles.dropDownIcon}></i>
            </span>
            <span>
              <select className={styles.sortSelect} onChange={this.selectSort.bind(this)}>
                <option value={'PRICE:DESC'}>Lowest Price</option>
                <option value={'PRICE:ASC'}>Highest Price</option>
                <option value={'REVIEWS:DESC'}>Best reviews</option>
                <option value={'POPULAR:DESC'}>Popular</option>
                <option value={'STAR:ASC'}>Stars 1 - 5</option>
                <option value={'STAR:DESC'}>Stars 5 - 1</option>
              </select>
            </span>

          </div>
          <Link className={styles.filterButton} to={`${pathToHotelSearch(searchParams)}/overlay/filter`}>
            Filter
            <i className={styles.filterIcon}></i>
          </Link>
        </div>
        <div>{
          displayedHotels.map(hotel =>
            <HotelCard
              key={hotel.get('id')}
              hotel={hotel}
              onClick={() => this.context.router.push(`${pathToHotelSearch(searchParams)}/overlay/hotels/${hotel.get('id')}`)}
            />
          )
        }</div>
        <button disabled={isLoading} className={styles.loadMoreButton} onClick={() => loadMore()}>{isLoading ? 'Loading...' : 'Load More'}</button>
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
  loadMore: () => dispatch(loadMore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
