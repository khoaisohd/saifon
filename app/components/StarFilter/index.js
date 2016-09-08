import React, { PropTypes } from 'react';
import StarRating from '../StarRating';
import CheckboxFilter from '../CheckboxFilter';

const StarFilter = (props) => {
  const { stars, toggleStarRatingFilter } = props;
  const values = ['5', '4', '3', '2', '1'];
  return (
    <div>
      {
        values.map(id =>
          <div key={id}>
            <CheckboxFilter checked={stars.getIn([id, 'selected'])} onClick={() => toggleStarRatingFilter(id)} >
              <StarRating value={parseInt(id)} />
            </CheckboxFilter>
          </div>
        )
      }
    </div>
  );
};

StarFilter.propTypes = {
  stars: PropTypes.object.isRequired,
  toggleStarRatingFilter: PropTypes.func.isRequired,
};

export default StarFilter;
