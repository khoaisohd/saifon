// Preload form assets

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import appStyles from 'containers/App/styles.css';
import { storeSearch, submitSearch } from './actions';
import { fromJS } from 'immutable';

class HotelSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { routeParams, filter, sort, submitSearch, offset, limit } = props;
    const search = fromJS({
      checkIn: routeParams.checkIn,
      checkOut: routeParams.checkOut,
      guestsCount: routeParams.guestsCount,
      locationId: routeParams.locationId,
      roomsCount: routeParams.roomsCount,
    });
    submitSearch(search, filter, sort, offset, limit);
    this.filterPath = `${props.location.pathname}overlay/filter`;
  }

  render() {
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
            Listing
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => () => ({
  filter: state.getIn(['HotelSearchResult', 'filter']),
  sort: state.getIn(['HotelSearchResult', 'sort']),
  offset: state.getIn(['HotelSearchResult', 'offset']),
  limit: state.getIn(['HotelSearchResult', 'limit']),
});

const mapDispatchToProps = dispatch => ({
  submitSearch: (search, filter, sort, offset, limit) => dispatch(submitSearch(search, filter, sort, offset, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchResult);
