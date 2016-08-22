import React from 'react';
import { Link } from 'react-router';
import appStyles from 'containers/App/styles.css';

class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className={appStyles.toolbar}>
          Wego
        </div>
        <div className={appStyles.containerBody}>
          <Link to="/hotels">Hotels</Link>
        </div>
      </div>
    );
  }
}

export default Home;
