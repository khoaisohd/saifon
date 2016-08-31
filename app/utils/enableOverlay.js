import React from 'react';
import Overlay from 'components/Overlay';

/* eslint-disable */

function enableOverlay(Component) {
  return React.createClass({
    render: function() {
      return (
        <div>
          <Overlay component={this.props.children}/>
          <Component {...this.props} />
        </div>
      );
    },
  });
}

/* eslint-enable */

export default enableOverlay;
