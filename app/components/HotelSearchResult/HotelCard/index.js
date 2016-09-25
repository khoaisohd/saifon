import React from 'react';
import styles from './index.css';

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
        <div>{hotel.reviewDescription} - {hotel.reviewScore}</div>
        <div>S${hotel.cheapestRate.price.amount}</div>
      </div>
    </div>
  );
};

export default HotelCard;
