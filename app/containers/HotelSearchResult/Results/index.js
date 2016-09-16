import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';
import styles from './styles.css';
import { fetchHotels, loadMore, sortHotels } from '../actions';
import { pathToHotelSearch } from 'utils/routes-util';
import HotelCard from 'components/HotelCard';
import { getDisplayedHotels, getSort, isLoading, hasNoResult, canLoadMore } from '../selectors';
import moment from 'moment';
import { DATE_FORMAT } from 'utils/dates';
import { fromJS } from 'immutable';

class Results extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { checkIn, checkOut, guestsCount, locationCode, roomsCount } = this.props.searchParams;
    this.props.fetchHotels({ checkIn, checkOut, guestsCount, locationCode, roomsCount });
  }

  selectSort(e) {
    const sortBy = e.target.value.split(':');
    this.props.sortHotels(fromJS({ property: sortBy[0], order: sortBy[1] }));
  }

  renderEmptyResult() {
    return (
      <div className={styles.noResultContainer}>
        No results match filters
      </div>
    );
  }

  renderPresentResult() {
    const { displayedHotels, canLoadMore, isLoading, loadMore, searchParams } = this.props;
    let button;
    if (isLoading) {
      button = <button className={styles.footerButton} disabled> Loading... </button>;
    } else if (canLoadMore) {
      button = <button className={styles.footerButton} onClick={() => loadMore()}>Load More</button>;
    } else {
      button = '';
    }

    return (
      <div>
        <div>{
          displayedHotels.map(hotel =>
            <HotelCard
              key={hotel.get('id')}
              hotel={hotel}
              onClick={() => this.context.router.push(`${pathToHotelSearch(searchParams)}/modal/hotels/${hotel.get('id')}`)}
            />
          )
        }</div>
        { button }
      </div>
    );
  }

  render() {
    const { searchParams, hasNoResult } = this.props;
    const { locationCode, checkIn, checkOut } = searchParams;

    return (
      <div className={styles.resultContainer}>
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
                <option value={'PRICE:ASC'}>Lowest Price</option>
                <option value={'PRICE:DESC'}>Highest Price</option>
                <option value={'REVIEWS:DESC'}>Best reviews</option>
                <option value={'POPULAR:DESC'}>Popular</option>
                <option value={'STAR:ASC'}>Stars 1 - 5</option>
                <option value={'STAR:DESC'}>Stars 5 - 1</option>
              </select>
            </span>

          </div>
          <Link className={styles.filterButton} to={`${pathToHotelSearch(searchParams)}/modal/filter`}>
            Filter
            <i className={styles.filterIcon}></i>
          </Link>
        </div>
        { hasNoResult ? this.renderEmptyResult() : this.renderPresentResult() }
      </div>
    );
  }
}

Results.propTypes = {
  displayedHotels: PropTypes.object.isRequired,
  sort: PropTypes.object.isRequired,
  fetchHotels: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
  sortHotels: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasNoResult: PropTypes.bool.isRequired,
  canLoadMore: PropTypes.bool.isRequired,
};

Results.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = state => ({
  displayedHotels: getDisplayedHotels(state),
  sort: getSort(state),
  isLoading: isLoading(state),
  hasNoResult: hasNoResult(state),
  canLoadMore: canLoadMore(state),
});

const mapDispatchToProps = dispatch => ({
  fetchHotels: search => dispatch(fetchHotels(search)),
  loadMore: () => dispatch(loadMore()),
  sortHotels: sortData => dispatch(sortHotels(sortData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
