import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleStarRatingFilter } from '../actions';
import appStyles from 'containers/App/styles.css';
import StarRatingsFilter from '../../../components/StarRatingsFilter';
import styles from './styles.css';
import { getFilter } from '../selectors';

class Filter extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleApplyClick() {
    this.context.router.goBack();
  }

  render() {
    const { filter, toggleStarRatingFilter } = this.props;
    return (
      <div>
        <div className={styles.toolbar}>
          filters
          <i className={appStyles.cancelIcon} onClick={this.context.router.goBack} />
        </div>
        <div className={appStyles.containerBody}>
          <StarRatingsFilter
            stars={filter.get('stars')}
            toggleStarRatingFilter={toggleStarRatingFilter.bind(this)}
          />
          <button onClick={this.handleApplyClick.bind(this)}>Apply</button>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.object.isRequired,
};

Filter.contextTypes = {
  router: React.PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  toggleStarRatingFilter: (starRating) => dispatch(toggleStarRatingFilter(starRating)),
});

const mapStateToProps = state => ({
  filter: getFilter(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
