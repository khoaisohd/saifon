import React, { Component, PropTypes } from 'react';
import Price from '../Price';
import hotelCardstyles from './index.css';
import '../../styles/wego-icons.css';

class HotelCard extends Component {

  renderStars(starCount) {
    const goldStars = new Array(starCount).fill(0);
    const emptyStars = new Array(5 - starCount).fill(0);
    return (
      <div>
        { goldStars.map((star, index) => (<i key={index} className="icon-star" />)) }
        { emptyStars.map((star, index) => (<i key={index} className="icon-star empty-star" />)) }
      </div>
    );
  }

  render() {
    const { hotel } = this.props;

    let ratingScoreClass;
    if (hotel.score < 75 && hotel.score > 70) {
      ratingScoreClass = hotelCardstyles.neutral;
    } else if (hotel.score <= 70) {
      ratingScoreClass = hotelCardstyles.negative;
    }
    const reviewCount = hotel.reviewCount.toLocaleString();
    return (
      <div className={hotelCardstyles.hotelCard}>
        <div>
          <img className={hotelCardstyles.image} src={hotel.imageUrl} role="presentation" />
        </div>
        <div className={hotelCardstyles.summary}>
          <div className={hotelCardstyles.name}>{hotel.name}</div>
          <div className={hotelCardstyles.address}>{hotel.address}</div>
          <div className={hotelCardstyles.rating}>
            <span className={hotelCardstyles.ratingStars}>
              {this.renderStars(hotel.star)}
            </span>
          </div>
          <div className={hotelCardstyles.reviewRate}>
            <div className={`${hotelCardstyles.review} ${ratingScoreClass}`}>
              <span className={`${hotelCardstyles.score} ${ratingScoreClass}`}>{hotel.score}</span>
              <div className={hotelCardstyles.subreview}>
                <span className={`${hotelCardstyles.sentiment} ${ratingScoreClass}`}>{hotel.reviewSentiment}</span>
                <span className={hotelCardstyles.reviewCount}>
                  {reviewCount} reviews
                </span>
              </div>
            </div>
            <div className={hotelCardstyles.rate}>
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
