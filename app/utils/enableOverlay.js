import Modal from 'react-modal';

import React from 'react';

/* eslint-disable */

function enableOverlay(Component) {
  return React.createClass({
    getInitialState: function() {
      return {
        modalIsOpen: false,
      };
    },

    closeModal: function() {
      this.setState({ modalIsOpen: false });
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
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
          >
            {this.props.children}
          </Modal>

          <Component {...this.props} />
        </div>
      );
    },
  });
}

/* eslint-enable */

export default enableOverlay;
