import React, { Component, PropTypes } from 'react';
import Price from '../Price';
import './index.css';
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
      ratingScoreClass = 'neutral';
    } else if (hotel.score <= 70) {
      ratingScoreClass = 'negative';
    }
    const reviewCount = hotel.reviewCount.toLocaleString();
    return (
      <div className="hotel-card">
        <div className="hotel-card-image">
          <img className="image" src={hotel.imageUrl} role="presentation" />
        </div>
        <div className="hotel-card-summary">
          <div className="name">{hotel.name}</div>
          <div className="address">{hotel.address}</div>
          <div className="rating">
            <span className="rating-stars">
              {this.renderStars(hotel.star)}
            </span>
          </div>
          <div className="review_rate">
            <div className={`review ${ratingScoreClass}`}>
              <span className={`score ${ratingScoreClass}`}>{hotel.score}</span>
              <div className="subreview">
                <span className={`sentiment ${ratingScoreClass}`}>{hotel.reviewSentiment}</span>
                <span className="review-count">
                  {reviewCount} reviews
                </span>
              </div>
            </div>
            <div className="rate">
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
