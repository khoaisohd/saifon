import React from 'react';
import { connect } from 'react-redux';
import { addFilterStarType, removeFilterStarType } from '../actions';
import { fromJS } from 'immutable';
import { browserHistory } from 'react-router';
import appStyles from 'containers/App/styles.css';

class Filter extends React.Component {
  addFilter() {
    this.props.addFilterStarType('FIRST_STAR');
    browserHistory.goBack();
  }
  
  removeFilter() {
    this.props.removeFilterStarType('FIRST_STAR');
    browserHistory.goBack();
  }

  render() {
    return (
      <div>
        <div className={appStyles.toolbar}>
          FILTERS
        </div>
        <div className={appStyles.containerBody}>
          <button onClick={this.addFilter.bind(this)}>Add</button>
          <button onClick={this.removeFilter.bind(this)}>Remove</button>
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
});

export default connect(null, mapDispatchToProps)(Filter);
