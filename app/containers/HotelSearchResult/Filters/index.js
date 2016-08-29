import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleStarRatingFilter } from '../actions';
import appStyles from 'containers/App/styles.css';
import StarRatingsFilter from './StarRatingsFilter';

class Filters extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { filters, toggleStarRatingFilter } = this.props;
    return (
      <div>
        <div className={appStyles.toolbar}>
          FILTERS
        </div>
        <div className={appStyles.containerBody}>
          <button onClick={() => toggleStarRatingFilter('ONE_STAR')}>Toggle</button>

          <StarRatingsFilter starRatings={filters.get('starRatings')} />
          <div>
            Filter: { JSON.stringify(filters.toJS()) }
          </div>
          <button onClick={this.context.router.goBack}>Done</button>
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
});

const mapStateToProps = state => ({
  filters: state.getIn(['HotelSearchResult', 'filters']),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
