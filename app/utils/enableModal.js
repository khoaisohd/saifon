import React from 'react';
import Modal from 'react-modal';

/* eslint-disable */
const customStyles = {
  content : {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    padding: 0,
  }
};

function enableModal(Component) {
  return React.createClass({
    getInitialState: function() {
      return { modalIsOpen: false };
    },

    componentWillReceiveProps(nextProps) {
      if (nextProps.children) {
        this.setState({ modalIsOpen: true });
      } else {
        this.setState({ modalIsOpen: false });
      }
    },

    render: function() {
      return (
        <div>
          <Modal isOpen={this.state.modalIsOpen} style={customStyles}>
            {this.props.children}
          </Modal>
          <Component {...this.props} />
        </div>
      );
    },
  });
}

/* eslint-enable */

export default enableModal;
