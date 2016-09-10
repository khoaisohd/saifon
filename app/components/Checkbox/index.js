import React, { Component, PropTypes } from 'react';
import styles from './index.css';

class Checkbox extends Component {

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div className={styles.checkboxes} onClick={this.handleClick.bind(this)} >
        <span className={styles.label}>{this.props.children}</span>
        <span>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={this.props.checked}
          />
        </span>
      </div>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Checkbox;
