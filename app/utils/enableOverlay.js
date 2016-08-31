import React from 'react';
import Overlay from 'components/Overlay';

/* eslint-disable */

function enableOverlay(Component) {
  return React.createClass({
    render: function() {
      return (
        <div>
          <Overlay>
            {this.props.children}
          </Overlay>
          <Component {...this.props} />
        </div>
      );
    },
  });
}

/* eslint-enable */

export default enableOverlay;
