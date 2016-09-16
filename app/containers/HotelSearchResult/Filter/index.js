import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleStarRatingFilter, filterByPrice } from '../actions';
import appStyles from 'containers/App/styles.css';
import styles from './styles.css';
import { getFilter } from '../selectors';
import ReactSlider from 'react-slider';
import StarRating from 'containers/shared/StarRating';

const STARS = ['5', '4', '3', '2', '1'];

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
        <div>
          <div className={styles.filterSubTitle}>
            Price
          </div>
          <div className={styles.priceFilter}>
            <div className={styles.priceLabels}>
              <span className={styles.minPriceLabel}>S$ {this.state.minPriceValue}</span>
              <span className={styles.maxPriceLabel}>S$ {this.state.maxPriceValue}</span>
            </div>
            <ReactSlider
              withBars value={[this.state.minPriceValue, this.state.maxPriceValue]}
              step={5}
              min={filter.getIn(['minPrice', 'threshold'])}
              max={filter.getIn(['maxPrice', 'threshold'])}
              onChange={value => this.setState({ minPriceValue: value[0], maxPriceValue: value[1] })}
              onAfterChange={value => filterByPrice(value[0], value[1])}
            />
          </div>

          <div className={styles.filterSubTitle}>
            Star
          </div>
          <div className={styles.starFilter}>
            {
              STARS.map(id =>
                <label key={id} className={styles.checkboxContainer}>
                  <input className={styles.checkboxInput} type="checkbox" checked={filter.getIn(['stars', id, 'selected'])} onClick={() => toggleStarRatingFilter(id)} />
                  <StarRating value={parseInt(id)} />
                </label>
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
