import 'containers/HotelSearchResult/Filters'; // Preload form assets
import React, { Component } from 'react';
import Results from './Results';

class HotelSearchResult extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Results searchParams={this.props.routeParams} />
        {this.props.children}
      </div>
    );
  }
}

export default HotelSearchResult;
