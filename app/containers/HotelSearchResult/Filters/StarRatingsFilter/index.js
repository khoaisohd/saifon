import React, { PropTypes } from 'react';
import StarRating from '../../../../components/StarRating';
import starRatingsFilterStyles from './index.css';

const styles = Object.assign({}, starRatingsFilterStyles);

const CheckboxFilter = (props) => (
  <div className={styles.checkboxes}>
    <span className={styles.label}>{props.children}</span>
    <span>
      <input className={styles.checkbox} type="checkbox" checked={props.checked} />
    </span>
  </div>
);

CheckboxFilter.propTypes = {
  checked: PropTypes.bool,
};

const StarRatingsFilter = (props) => {
  const { starRatings } = props;
  return (
    <div>
      <CheckboxFilter checked={starRatings.get('FIVE_STAR')} >
        <StarRating count={5} />
      </CheckboxFilter>

      <CheckboxFilter checked={starRatings.get('FOUR_STAR')} >
        <StarRating count={4} />
      </CheckboxFilter>

      <CheckboxFilter checked={starRatings.get('THREE_STAR')}>
        <StarRating count={3} />
      </CheckboxFilter>

      <CheckboxFilter checked={starRatings.get('TWO_STAR')}>
        <StarRating count={2} />
      </CheckboxFilter>
    </div>
  );
};

StarRatingsFilter.propTypes = {
  starRatings: PropTypes.object.isRequired,
};

export default StarRatingsFilter;
