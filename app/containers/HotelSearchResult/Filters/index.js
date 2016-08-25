import React from 'react';
import { connect } from 'react-redux';
import { addFilterStarType, removeFilterStarType } from '../actions';
import { browserHistory } from 'react-router';
import appStyles from 'containers/App/styles.css';

class Filters extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { filter, addFilterStarType, removeFilterStarType } = this.props;
    return (
      <div>
        <div className={appStyles.toolbar}>
          FILTERS
        </div>
        <div className={appStyles.containerBody}>
          <button onClick={() => addFilterStarType('FIRST_STAR')}>Add</button>
          <button onClick={() => removeFilterStarType('FIRST_STAR')}>Remove</button>
          <div>
            Filter: { JSON.stringify(filter.toJS()) }
          </div>
          <button onClick={() => browserHistory.goBack()}>Done</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addFilterStarType: starType => dispatch(addFilterStarType(starType)),
  removeFilterStarType: starType => dispatch(removeFilterStarType(starType)),
});

const mapStateToProps = state => ({
  filter: state.getIn(['HotelSearchResult', 'filter']),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
