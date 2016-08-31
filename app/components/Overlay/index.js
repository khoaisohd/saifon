import React, { PropTypes } from 'react';
import styles from './styles.css';

function Overlay(props) {
  if (props.children) {
    return (
      <div className={styles.overlayContainer}>
        {props.children}
      </div>
    );
  }
  return <div />;
}

Overlay.propTypes = {
  component: PropTypes.object,
};

export default Overlay;
