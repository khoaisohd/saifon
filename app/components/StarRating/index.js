import React, { PropTypes } from 'react';
import wegoIcons from '../../styles/wego-icons.css';
import starRatingStyles from './index.css';

const styles = Object.assign({}, starRatingStyles, wegoIcons);

const StarRating = (props) => {
  const rounderOffStarCount = Math.round(props.count);
  const goldStars = new Array(rounderOffStarCount).fill(0);
  const emptyStars = new Array(5 - rounderOffStarCount).fill(0);
  return (
    <div className={styles.ratingStars}>
      { goldStars.map((star, index) => (<i key={index} className={styles.iconStar} />)) }
      { emptyStars.map((star, index) => (<i key={index} className={`${styles.iconStar} ${styles.emptyStar}`} />)) }
    </div>
  );
};

StarRating.propTypes = {
  count: PropTypes.number.isRequired,
};

export default StarRating;
