import React, { PropTypes } from 'react';
import StarRating from '../StarRating';
import CheckboxFilter from '../CheckboxFilter';

const StarRatingsFilter = (props) => {
  const { starRatings, toggleStarRatingFilter } = props;
  return (
    <div>
      <div>
        <CheckboxFilter checked={starRatings.get('FIVE_STAR')} onClick={() => toggleStarRatingFilter('FIVE_STAR')} >
          <StarRating value={5} />
        </CheckboxFilter>
      </div>

      <CheckboxFilter checked={starRatings.get('FOUR_STAR')} onClick={() => toggleStarRatingFilter('FOUR_STAR')}>
        <StarRating value={4} />
      </CheckboxFilter>

      <CheckboxFilter checked={starRatings.get('THREE_STAR')} onClick={() => toggleStarRatingFilter('THREE_STAR')}>
        <StarRating value={3} />
      </CheckboxFilter>

      <CheckboxFilter checked={starRatings.get('TWO_STAR')} onClick={() => toggleStarRatingFilter('TWO_STAR')}>
        <StarRating value={2} />
      </CheckboxFilter>
    </div>
  );
};

StarRatingsFilter.propTypes = {
  starRatings: PropTypes.object.isRequired,
  toggleStarRatingFilter: PropTypes.func,
};

export default StarRatingsFilter;
