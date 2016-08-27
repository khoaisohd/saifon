import React from 'react';
import { connect } from 'react-redux';
import { toggleStarRatingFilter } from '../actions';
import appStyles from 'containers/App/styles.css';

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
          <div>
            Filter: { JSON.stringify(filters.toJS()) }
          </div>
          <button onClick={this.context.router.goBack}>Done</button>
        </div>
      </div>
    );
  }
}

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
