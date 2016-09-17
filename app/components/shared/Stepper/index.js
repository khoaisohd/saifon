import React, { PropTypes } from 'react';
import styles from './styles.css';
import Ink from 'components/shared/Ink';

const Stepper = props => {
  const { onIncrease, onDecrease, increaseEnabled, decreaseEnabled } = props;
  const decreaseButtonClass = `${decreaseEnabled ? styles.activeButton : styles.disableButton} ${styles.leftButton}`;
  const increaseButtonClass = increaseEnabled ? styles.activeButton : styles.disableButton;
  return (
    <div className={styles.container}>
      <button disabled={!decreaseEnabled} className={decreaseButtonClass}>
        { decreaseEnabled ? <Ink onClick={onDecrease} /> : '' }
        -
      </button>
      <button disabled={!increaseEnabled} className={increaseButtonClass}>
        { increaseEnabled ? <Ink onClick={onIncrease} /> : ''}
        +
      </button>
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
