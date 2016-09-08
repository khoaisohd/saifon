// Preload form assets
import 'containers/HotelSearchResult/Filters';
import 'containers/HotelSearchResult/HotelDetails';

import React, { Component } from 'react';
import Results from './Results';
import Modal from 'react-modal';

/* eslint-disable */
const customStyles = {
  content : {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    padding: 0,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

class HotelSearchResult extends Component { 
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children) {
      this.setState({ isModalOpen: true });
    } else {
      this.setState({ isModalOpen: false });
    }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} style={customStyles}>
          {this.props.children}
        </Modal>
        <Results searchParams={this.props.routeParams} />
      </div>
    );
  }
}

export default HotelSearchResult;
