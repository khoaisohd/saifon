import React, { Component, PropTypes } from 'react';
import styles from './index.css';

class CheckboxFilter extends Component {

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

CheckboxFilter.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default CheckboxFilter;
