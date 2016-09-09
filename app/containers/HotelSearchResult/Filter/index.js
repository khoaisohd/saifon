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
  handleApplyClick() {
    this.context.router.goBack();
  }

  render() {
    const { filter, toggleStarRatingFilter, filterByPrice } = this.props;
    const minPriceThreshold = filter.getIn(['minPrice', 'threshold']);
    const minPriceValue = Math.max(filter.getIn(['minPrice', 'value']), minPriceThreshold);
    const maxPriceThreshold = filter.getIn(['maxPrice', 'threshold']);
    const maxPriceValue = Math.min(filter.getIn(['maxPrice', 'value']), maxPriceThreshold);

    return (
      <div>
        <div className={styles.toolbar}>
          filters
          <i className={appStyles.cancelIcon} onClick={this.context.router.goBack} />
        </div>
        <div className={appStyles.containerBody}>
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

          Price
          <div className={styles.inputRange}>
            <span>{minPriceValue}</span> -> <span>{maxPriceValue}</span>
            <ReactSlider
              withBars value={[minPriceValue, maxPriceValue]}
              step={5}
              min={minPriceThreshold}
              max={maxPriceThreshold}
              onChange={value => filterByPrice(value[0], value[1])}
            />
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
