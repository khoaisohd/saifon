import React, { Component, PropTypes } from 'react';
import Price from '../Price';
import hotelCardstyles from './index.css';
import wegoIcons from '../../styles/wego-icons.css';

const styles = Object.assign({}, hotelCardstyles, wegoIcons);

class HotelCard extends Component {

  renderStars(starCount) {
    const goldStars = new Array(starCount).fill(0);
    const emptyStars = new Array(5 - starCount).fill(0);
    return (
      <div>
        { goldStars.map((star, index) => (<i key={index} className={styles.iconStar} />)) }
        { emptyStars.map((star, index) => (<i key={index} className={`${styles.iconStar} ${styles.emptyStar}`} />)) }
      </div>
    );
  }

  render() {
    const { hotel } = this.props;

    let ratingScoreClass;
    if (hotel.score < 75 && hotel.score > 70) {
      ratingScoreClass = styles.neutral;
    } else if (hotel.score <= 70) {
      ratingScoreClass = styles.negative;
    }
    const reviewCount = hotel.reviewCount.toLocaleString();
    return (
      <div className={styles.hotelCard}>
        <div>
          <img className={styles.image} src={hotel.imageUrl} role="presentation" />
        </div>
        <div className={styles.summary}>
          <div className={styles.name}>{hotel.name}</div>
          <div className={styles.address}>{hotel.address}</div>
          <div className={styles.rating}>
            <span className={styles.ratingStars}>
              {this.renderStars(hotel.star)}
            </span>
          </div>
          <div className={styles.reviewRate}>
            <div className={`${styles.review} ${ratingScoreClass}`}>
              <span className={`${styles.score} ${ratingScoreClass}`}>{hotel.score}</span>
              <div className={styles.subreview}>
                <span className={`${styles.sentiment} ${ratingScoreClass}`}>{hotel.reviewSentiment}</span>
                <span className={styles.reviewCount}>
                  {reviewCount} reviews
                </span>
              </div>
            </div>
            <div className={styles.rate}>
              <Price amount={hotel.price.amount} currencyCode={hotel.price.currencyCode} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HotelCard.propTypes = {
  hotel: PropTypes.object.isRequired,
};

export default HotelCard;
