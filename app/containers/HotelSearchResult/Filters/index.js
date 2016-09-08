import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleStarRatingFilter } from '../actions';
import appStyles from 'containers/App/styles.css';
import StarRatingsFilter from '../../../components/StarRatingsFilter';
import styles from './styles.css';
import { getFilters } from '../selectors';

class Filters extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleApplyClick() {
    this.context.router.goBack();
  }

  render() {
    const { filters, toggleStarRatingFilter } = this.props;
    return (
      <div>
        <div className={styles.toolbar}>
          filters
          <i className={appStyles.cancelIcon} onClick={this.context.router.goBack} />
        </div>
        <div className={appStyles.containerBody}>
          <StarRatingsFilter
            starRatings={filters.get('starRatings')}
            toggleStarRatingFilter={toggleStarRatingFilter.bind(this)}
          />
          <button onClick={this.handleApplyClick.bind(this)}>Apply</button>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
};

Filters.contextTypes = {
  router: React.PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  toggleStarRatingFilter: (starRating) => dispatch(toggleStarRatingFilter(starRating)),
});

const mapStateToProps = state => ({
  filters: getFilters(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
