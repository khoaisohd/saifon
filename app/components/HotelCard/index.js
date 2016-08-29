import React, { PropTypes } from 'react';
import Price from '../Price';
import hotelCardstyles from './index.css';
import wegoIcons from '../../styles/wego-icons.css';
import StarRating from '../StarRating';

const styles = Object.assign({}, hotelCardstyles, wegoIcons);

const HotelCard = (props) => {
  const { hotel } = props;

  let ratingScoreClass;
  if (hotel.get('reviewScore') < 75 && hotel.get('reviewScore') > 70) {
    ratingScoreClass = styles.neutral;
  } else if (hotel.get('reviewScore') <= 70) {
    ratingScoreClass = styles.negative;
  }
  const reviewCount = parseInt(hotel.get('reviewCount'), 10).toLocaleString();
  return (
    <div className={styles.hotelCard}>
      <div>
        <img className={styles.image} src={hotel.get('imageUrl')} role="presentation" />
      </div>
      <div className={styles.summary}>
        <div className={styles.name}>{hotel.get('name')}</div>
        <div className={styles.address}>{hotel.get('districtName')}</div>
        <div className={styles.rating}>
          <span className={styles.ratingStars}>
            <StarRating count={hotel.get('star')} />
          </span>
        </div>
        <div className={styles.reviewRate}>
          <div className={`${styles.review} ${ratingScoreClass}`}>
            <span className={`${styles.score} ${ratingScoreClass}`}>{hotel.get('reviewScore')}</span>
            <div className={styles.subreview}>
              <span className={`${styles.sentiment} ${ratingScoreClass}`}>{hotel.get('reviewDescription')}</span>
              <span className={styles.reviewCount}>
                {reviewCount} reviews
              </span>
            </div>
          </div>
          <div className={styles.rate}>
            <Price amount={hotel.getIn(['cheapesRate', 'price', 'amount'])} currencyCode={hotel.getIn(['cheapesRate', 'price', 'currencyCode'])} />
          </div>
        </div>
      </div>
    </div>
  );
};

HotelCard.propTypes = {
  hotel: PropTypes.object.isRequired,
};

export default HotelCard;
