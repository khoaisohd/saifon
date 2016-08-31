import React, { PropTypes } from 'react';
import styles from './styles.css';

let lastComponent = null;
let firstLoad = true;

function Overlay(props) {
  const { component } = props;
  const renderComponent = component || lastComponent;
  const loadState = firstLoad ? styles.firstLoad : styles.notFirstLoad;
  const displayState = component ? styles.isShown : '';

  firstLoad = false;
  lastComponent = component;

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
