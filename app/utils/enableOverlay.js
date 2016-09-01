import React from 'react';
import Overlay from 'components/Overlay';
import appStyles from 'containers/App/styles.css';

/* eslint-disable */

function enableOverlay(Component) {
  return React.createClass({
    render: function() {
      return (
        <div>
          <Overlay>
            {this.props.children}
          </Overlay>
          <div className={this.props.children ? appStyles.noScroll : ''}>
            <Component {...this.props} />
          </div>
        </div>
      );
    },
  });
}

/* eslint-enable */

export default enableOverlay;
