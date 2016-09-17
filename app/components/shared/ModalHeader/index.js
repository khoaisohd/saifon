import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import Ink from 'components/shared/Ink';

class ModalHeader extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.toolbar}>
        {this.props.title}
        <i className={styles.cancelIcon}><Ink onClick={this.context.router.goBack} /></i>
      </div>
    );
  }
}

ModalHeader.contextTypes = {
  router: React.PropTypes.object,
};

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ModalHeader;
