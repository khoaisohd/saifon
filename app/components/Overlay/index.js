import React, { PropTypes } from 'react';
import styles from './styles.css';

let lastComponent = null;
let firstLoad = true;

function Overlay(props) {
  const { children } = props;
  const renderComponent = children || lastComponent;
  const loadState = firstLoad ? styles.firstLoad : styles.afterFirstLoad;
  const displayState = children ? styles.isShown : '';

  firstLoad = false;
  lastComponent = children;

  return (
    <div className={`${styles.overlayContainer} ${displayState} ${loadState}`}>
      {renderComponent}
    </div>
  );
}

Overlay.propTypes = {
  component: PropTypes.object,
};

export default Overlay;
