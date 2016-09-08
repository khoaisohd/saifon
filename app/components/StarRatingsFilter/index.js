import React, { PropTypes } from 'react';
import StarRating from '../StarRating';
import CheckboxFilter from '../CheckboxFilter';

const StarRatingsFilter = (props) => {
  const { stars, toggleStarRatingFilter } = props;
  return (
    <div>
      <div>
        <CheckboxFilter checked={stars.getIn(['5', 'selected'])} onClick={() => toggleStarRatingFilter('5')} >
          <StarRating value={5} />
        </CheckboxFilter>
      </div>

      <CheckboxFilter checked={stars.getIn(['4', 'selected'])} onClick={() => toggleStarRatingFilter('4')}>
        <StarRating value={4} />
      </CheckboxFilter>

      <CheckboxFilter checked={stars.getIn(['3', 'selected'])} onClick={() => toggleStarRatingFilter('3')}>
        <StarRating value={3} />
      </CheckboxFilter>

      <CheckboxFilter checked={stars.getIn(['2', 'selected'])} onClick={() => toggleStarRatingFilter('2')}>
        <StarRating value={2} />
      </CheckboxFilter>
    </div>
  );
};

StarRatingsFilter.propTypes = {
  stars: PropTypes.object.isRequired,
  toggleStarRatingFilter: PropTypes.func.isRequired,
};

export default StarRatingsFilter;
