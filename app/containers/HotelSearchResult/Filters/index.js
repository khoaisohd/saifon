import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleStarRatingFilter, filterHotels } from '../actions';
import appStyles from 'containers/App/styles.css';
import StarRatingsFilter from '../../../components/StarRatingsFilter';

class Filters extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleApplyClick() {
    this.props.filterHotels();
    this.context.router.goBack();
  }

  render() {
    const { filters, toggleStarRatingFilter } = this.props;
    return (
      <div>
        <div className={appStyles.toolbar}>
          FILTERS
        </div>
        <div className={appStyles.containerBody}>
          <StarRatingsFilter starRatings={filters.get('starRatings')} toggleStarRatingFilter={toggleStarRatingFilter.bind(this)} />
          <button onClick={this.handleApplyClick.bind(this)}>Apply</button>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  toggleStarRatingFilter: PropTypes.func.isRequired,
};

Filters.contextTypes = {
  router: React.PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  toggleStarRatingFilter: (star) => dispatch(toggleStarRatingFilter(star)),
  filterHotels: () => dispatch(filterHotels()),
});

const mapStateToProps = state => ({
  filters: state.getIn(['HotelSearchResult', 'filters']),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
