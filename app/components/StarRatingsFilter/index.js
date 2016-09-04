import React, { Component, PropTypes } from 'react';
import StarRating from '../StarRating';
import CheckboxFilter from '../CheckboxFilter';

class StarRatingsFilter extends Component {

  onClickFilter(value) {
    let starRatings = this.props.starRatings;
    if (starRatings.includes(value)) {
      starRatings = starRatings.filterNot((rating) => rating === value);
    } else {
      starRatings = starRatings.push(value);
    }
    this.props.filterByStarRatings(starRatings);
  }

  render() {
    const { starRatings } = this.props;
    return (
      <div>
        <div>
          <CheckboxFilter checked={starRatings.includes(5)} onClick={() => this.onClickFilter(5)} >
            <StarRating value={5} />
          </CheckboxFilter>
        </div>

        <CheckboxFilter checked={starRatings.includes(4)} onClick={() => this.onClickFilter(4)}>
          <StarRating value={4} />
        </CheckboxFilter>

        <CheckboxFilter checked={starRatings.includes(3)} onClick={() => this.onClickFilter(3)}>
          <StarRating value={3} />
        </CheckboxFilter>

        <CheckboxFilter checked={starRatings.includes(2)} onClick={() => this.onClickFilter(2)}>
          <StarRating value={2} />
        </CheckboxFilter>
      </div>
    );
  }
}

StarRatingsFilter.propTypes = {
  starRatings: PropTypes.object.isRequired,
  filterByStarRatings: PropTypes.func.isRequired,
};

export default StarRatingsFilter;
