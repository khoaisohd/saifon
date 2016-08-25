import React from 'react';
import { connect } from 'react-redux';
import { addFilterStarType, removeFilterStarType } from '../actions';
import appStyles from 'containers/App/styles.css';

class Filters extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { filters, addFilterStarType, removeFilterStarType } = this.props;
    return (
      <div>
        <div className={appStyles.toolbar}>
          FILTERS
        </div>
        <div className={appStyles.containerBody}>
          <button onClick={() => addFilterStarType('FIRST_STAR')}>Add</button>
          <button onClick={() => removeFilterStarType('FIRST_STAR')}>Remove</button>
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
  router: React.PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  addFilterStarType: starType => dispatch(addFilterStarType(starType)),
  removeFilterStarType: starType => dispatch(removeFilterStarType(starType)),
});

const mapStateToProps = state => ({
  filters: state.getIn(['HotelSearchResult', 'filters']),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
