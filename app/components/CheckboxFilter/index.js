import React, { Component, PropTypes } from 'react';
import styles from './index.css';

class CheckboxFilter extends Component {

  constructor(props) {
    super(props);
    this.state = { checked: props.checked };
  }

  handleClick() {
    this.setState({ checked: !this.state.checked });
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
            checked={this.state.checked}
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
