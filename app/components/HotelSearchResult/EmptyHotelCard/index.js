import React from 'react';
import styles from './styles.css';

const EmptyHotelCard = () => { // eslint-disable-line arrow-body-style
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.leftContainerBox}></div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.firstRow}></div>
        <div className={styles.secondRow}></div>
        <div className={styles.thirdRow}></div>
      </div>
    </div>
  );
};

export default EmptyHotelCard;
