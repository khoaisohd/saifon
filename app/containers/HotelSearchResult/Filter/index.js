import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleStarRatingFilter, filterByPrice } from '../actions';
import appStyles from 'containers/App/styles.css';
import styles from './styles.css';
import { getFilter } from '../selectors';
import ReactSlider from 'react-slider';
import Checkbox from 'components/Checkbox';
import StarRating from 'components/StarRating';

class Filter extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const minPriceValue = Math.max(props.filter.getIn(['minPrice', 'value']), props.filter.getIn(['minPrice', 'threshold']));
    const maxPriceValue = Math.min(props.filter.getIn(['maxPrice', 'value']), props.filter.getIn(['maxPrice', 'threshold']));
    this.state = {
      minPriceValue,
      maxPriceValue,
    };
  }

  handleApplyClick() {
    this.context.router.goBack();
  }

  render() {
    const { filter, toggleStarRatingFilter, filterByPrice } = this.props;
    return (
      <div>
        <div className={styles.toolbar}>
          filters
          <i className={appStyles.cancelIcon} onClick={this.context.router.goBack} />
        </div>
        <div className={appStyles.containerBody}>
          Price
          <div className={styles.inputRange}>
            <span>{this.state.minPriceValue}</span> -> <span>{this.state.maxPriceValue}</span>
            <ReactSlider
              withBars value={[this.state.minPriceValue, this.state.maxPriceValue]}
              step={5}
              min={filter.getIn(['minPrice', 'threshold'])}
              max={filter.getIn(['maxPrice', 'threshold'])}
              onChange={value => this.setState({ minPriceValue: value[0], maxPriceValue: value[1] })}
              onAfterChange={value => filterByPrice(value[0], value[1])}
            />
          </div>

          Star
          <div>
            {
              ['5', '4', '3', '2', '1'].map(id =>
                <div key={id}>
                  <Checkbox checked={filter.getIn(['stars', id, 'selected'])} onClick={() => toggleStarRatingFilter(id)} >
                    <StarRating value={parseInt(id)} />
                  </Checkbox>
                </div>
              )
            }
          </div>
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
  filterByPrice: (minPrice, maxPrice) => dispatch(filterByPrice(minPrice, maxPrice)),
});

const mapStateToProps = state => ({
  filter: getFilter(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
