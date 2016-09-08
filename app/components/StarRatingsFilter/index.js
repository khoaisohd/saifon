import React, { PropTypes } from 'react';
import StarRating from '../StarRating';
import CheckboxFilter from '../CheckboxFilter';

const StarRatingsFilter = (props) => {
  const { stars, toggleStarRatingFilter } = props;
  const values = ['5', '4', '3', '2', '1'];
  return (
    <div>
      {
        values.map(id =>
          <div>
            <CheckboxFilter checked={stars.getIn([id, 'selected'])} onClick={() => toggleStarRatingFilter(id)} >
              <StarRating value={id} />
            </CheckboxFilter>
          </div>
        )
      }
    </div>
  );
};

StarRatingsFilter.propTypes = {
  stars: PropTypes.object.isRequired,
  toggleStarRatingFilter: PropTypes.func.isRequired,
};

export default StarRatingsFilter;
