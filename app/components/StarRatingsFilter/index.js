import React, { PropTypes } from 'react';
import StarRating from '../StarRating';
import CheckboxFilter from '../CheckboxFilter';

const StarRatingsFilter = (props) => {
  const { starRatings, toggleStarRatingFilter } = props;
  return (
    <div>
      <div>
        <CheckboxFilter checked={starRatings.getIn(['5', 'selected'])} onClick={() => toggleStarRatingFilter('5')} >
          <StarRating value={5} />
        </CheckboxFilter>
      </div>

      <CheckboxFilter checked={starRatings.getIn(['4', 'selected'])} onClick={() => toggleStarRatingFilter('4')}>
        <StarRating value={4} />
      </CheckboxFilter>

      <CheckboxFilter checked={starRatings.getIn(['3', 'selected'])} onClick={() => toggleStarRatingFilter('3')}>
        <StarRating value={3} />
      </CheckboxFilter>

      <CheckboxFilter checked={starRatings.getIn(['2', 'selected'])} onClick={() => toggleStarRatingFilter('2')}>
        <StarRating value={2} />
      </CheckboxFilter>
    </div>
  );
};

StarRatingsFilter.propTypes = {
  starRatings: PropTypes.object.isRequired,
  toggleStarRatingFilter: PropTypes.func.isRequired,
};

export default StarRatingsFilter;
