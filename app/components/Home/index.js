import React from 'react';
import styles from './styles.css';

class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.hotelsButton} onTouchTap={() => this.context.router.push('/hotels')}>
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
