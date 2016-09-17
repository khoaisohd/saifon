import React from 'react';
import styles from './styles.css';
import Ink from 'components/shared/LegacyInk';

class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.hotelsButton}>
          <Ink onClick={() => this.context.router.push('hotels')} />
          <i className={styles.hotelIcon} />
          Hotels
        </div>
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object,
};

export default Home;