import React, { PropTypes } from 'react';
import styles from './styles.css';

const Stepper = props => {
  const { onIncrease, onDecrease, increaseEnabled, decreaseEnabled } = props;
  const decreaseButtonClass = `${decreaseEnabled ? styles.activeButton : styles.disableButton} ${styles.leftButton}`;
  const increaseButtonClass = increaseEnabled ? styles.activeButton : styles.disableButton;
  return (
    <div className={styles.container}>
      <button className={decreaseButtonClass} onClick={decreaseEnabled ? onDecrease : () => {}}>-</button>
      <button className={increaseButtonClass} onClick={increaseEnabled ? onIncrease : () => {}}>+</button>
    </div>
  );
};

Stepper.propTypes = {
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  increaseEnabled: PropTypes.bool.isRequired,
  decreaseEnabled: PropTypes.bool.isRequired,
};

export default Stepper;
