import React, { PropTypes } from 'react';
import styles from './styles.css';

const Stepper = props => {
  const { onIncrease, onDecrease, increaseEnabled, decreaseEnabled } = props;
  return (
    <div>
      <button className={decreaseEnabled ? styles.enabledButton : styles.disableButton} onClick={onDecrease}>-</button>
      <button className={increaseEnabled ? styles.enabledButton : styles.disableButton} onClick={onIncrease}>+</button>
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
