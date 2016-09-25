import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import appStyles from 'components/shared/styles.css';
import styles from './styles.css';
import { fetchHotels, sortHotels } from './actions';
import { pathToHotelSearch } from 'helpers/routeHelper';
import HotelCard from './HotelCard';
import EmptyHotelCard from './EmptyHotelCard';
import { getDisplayedHotels, getSort, isLoading, hasNoResult } from './selectors';
import moment from 'moment';
import { DATE_FORMAT } from 'helpers/dateHelper';
import { fromJS } from 'immutable';
import { VirtualScroll, AutoSizer } from 'react-virtualized';

class HotelSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { checkIn, checkOut, guestsCount, locationCode, roomsCount } = this.props.searchParams;
    this.props.fetchHotels({ checkIn, checkOut, guestsCount, locationCode, roomsCount });
    this.state = {
      scrollTop: 0,
      showHeader: true,
    };
  }

  handleSelectSort(e) {
    const sortBy = e.target.value.split(':');
    this.props.sortHotels(fromJS({ property: sortBy[0], order: sortBy[1] }));
  }

  handleScroll(scrollTop) {
    let showHeader;
    if (scrollTop < 120) {
      showHeader = true;
    } else if (this.state.showHeader === false && this.state.scrollTop - scrollTop > 10) {
      showHeader = true;
    } else if (this.state.showHeader === true && scrollTop - this.state.scrollTop > 10) {
      showHeader = false;
    }
    if (showHeader !== undefined && showHeader !== this.state.showHeader) {
      this.setState({ showHeader });
    }
    this.state.scrollTop = scrollTop;
  }

  renderHotelCard(index) {
    const { displayedHotels, searchParams } = this.props;
    const hotel = displayedHotels[index];
    return (
      <HotelCard
        key={hotel.id}
        hotel={hotel}
        onTouchTap={() => this.context.router.push(`${pathToHotelSearch(searchParams)}/modal/hotels/${hotel.id}`)}
      />
    );
  }

  renderEmptyResult() {
    return (
      <div className={styles.noResultContainer}>
        No results match filters
      </div>
    );
  }

  renderLoading() {
    const list = [1, 2, 3, 4, 5];
    return (
      <div className={styles.loadingScreen}>
        {list.map(id => <EmptyHotelCard key={id} />)}
      </div>
    );
  }

  renderPresentResult() {
    return (
      <div className={styles.displayedHotels}>
        <AutoSizer>
          {({ height, width }) => (
            <VirtualScroll
              overscanRowCount={4}
              width={width}
              height={height}
              rowCount={this.props.displayedHotels.length + 1}
              rowHeight={({ index }) => index === 0 ? 100 : 140} // eslint-disable-line no-confusing-arrow
              rowRenderer={({ index }) => index === 0 ? '' : this.renderHotelCard(index - 1)} // eslint-disable-line no-confusing-arrow
              onScroll={({ scrollTop }) => requestAnimationFrame(() => this.handleScroll(scrollTop))}
            />
          )}
        </AutoSizer>
      </div>
    );
  }

  render() {
    const { searchParams, hasNoResult, isLoading } = this.props;
    const { locationCode, checkIn, checkOut } = searchParams;
    let content;
    if (isLoading) {
      content = this.renderLoading();
    } else if (hasNoResult) {
      content = this.renderEmptyResult();
    } else {
      content = this.renderPresentResult();
    }

    return (
      <div className={styles.resultContainer}>
        <div className={this.state.showHeader ? styles.header : styles.hiddenHeader}>
          <div className={appStyles.toolbar}>
            <i className={appStyles.backButton} onTouchTap={this.context.router.goBack} />
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
                <select className={styles.sortSelect} onChange={this.handleSelectSort.bind(this)}>
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
        </div>
        {content}
      </div>
    );
  }
}

HotelSearchResult.propTypes = {
  displayedHotels: PropTypes.object.isRequired,
  sort: PropTypes.object.isRequired,
  fetchHotels: PropTypes.func.isRequired,
  sortHotels: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasNoResult: PropTypes.bool.isRequired,
};

HotelSearchResult.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = state => ({
  displayedHotels: getDisplayedHotels(),
  sort: getSort(state),
  isLoading: isLoading(state),
  hasNoResult: hasNoResult(state),
});

const mapDispatchToProps = dispatch => ({
  fetchHotels: search => dispatch(fetchHotels(search)),
  sortHotels: sortData => dispatch(sortHotels(sortData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchResult);
