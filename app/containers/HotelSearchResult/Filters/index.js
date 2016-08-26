import React from 'react';
import { connect } from 'react-redux';
import { filterByStar } from '../actions';
import appStyles from 'containers/App/styles.css';

class Filters extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { filters, filterByStar } = this.props;
    return (
      <div>
        <div className={appStyles.toolbar}>
          FILTERS
        </div>
        <div className={appStyles.containerBody}>
          <button onClick={() => filterByStar('ONE_STAR', true)}>Add</button>
          <button onClick={() => filterByStar('ONE_STAR', false)}>Remove</button>
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
  filterByStar: (star, selected) => dispatch(filterByStar(star, selected)),
});

const mapStateToProps = state => ({
  filters: state.getIn(['HotelSearchResult', 'filters']),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
