import React, { PropTypes } from 'react';
import styles from './index.css';

const StarRating = (props) => {
  const rounderOffStarCount = Math.round(props.count);
  const goldStars = new Array(rounderOffStarCount).fill(0);
  const emptyStars = new Array(5 - rounderOffStarCount).fill(0);
  return (
    <div className={styles.ratingStars}>
      { goldStars.map((star, index) => (<i key={index} className={styles.goldStar} />)) }
      { emptyStars.map((star, index) => (<i key={index} className={styles.emptyStar} />)) }
    </div>
  );
};

StarRating.propTypes = {
  count: PropTypes.number.isRequired,
};

export default StarRating;
