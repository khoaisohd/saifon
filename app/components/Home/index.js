import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.container}>
        <Link className={styles.hotelsButton} to="/hotels">
          <i className={styles.hotelIcon} />
          Hotels
        </Link>
      </div>
    );
  }
}

export default Home;
