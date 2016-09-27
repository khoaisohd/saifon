import React from 'react';
import styles from './index.css';
import StarRating from 'components/shared/StarRating';

const starViews = {
  1: <StarRating value={1} />,
  2: <StarRating value={2} />,
  3: <StarRating value={3} />,
  4: <StarRating value={4} />,
  5: <StarRating value={5} />,
};

const HotelCard = props => {
  const { hotel } = props;

  return (
    <div className={styles.hotelCard} onTouchTap={props.onTouchTap}>
      <div>
        <img className={styles.image} src={hotel.imageUrl} role="presentation" />
      </div>
      <div className={styles.summary}>
        <div className={styles.name}>{hotel.name}</div>
        <div className={styles.address}>{hotel.districtName}</div>
        <div className={styles.rating}>
          {starViews[hotel.star]}
        </div>
        <div className={styles.reviewRate}>
          <span className={`${styles.score}`}>{hotel.reviewScore}</span>
          <div className={styles.subreview}>
            <span className={styles.sentiment}>{hotel.reviewDescription}</span>
            <span className={styles.reviewCount}>
              {hotel.reviewCount} reviews
            </span>
          </div>
          <div className={styles.rate}>
            <span className={styles.rateCurrencySymbol}>S$</span>
            <span className={styles.rateAmount}>{hotel.cheapestRate.price.amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
