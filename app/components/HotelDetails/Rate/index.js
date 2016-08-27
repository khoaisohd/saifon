import React, { PropTypes } from 'react';
import Price from '../../Price';
import wegoIconsStyles from '../../../styles/wego-icons.css';
import rateStyles from './index.css';

const styles = Object.assign({}, rateStyles, wegoIconsStyles);

const Rate = (props) => {
  const { rate, showDescription } = props;
  return (
    <div className={styles.main}>
      <div className={styles.rate}>
        <div className={styles.provider}>
          <span><img className={styles.image} alt={rate.provider.code} src={rate.provider.imageUrl} /></span>
          <span><i className={`${styles.iconMobile1} ${styles.mobileIcon}`}></i></span>
        </div>
        <div className={styles.price}>
          <Price amount={rate.price.amount} currencyCode={rate.price.currencyCode} />
        </div>
      </div>
      <div className={styles.description}>
        {showDescription && rate.description}
      </div>
    </div>
  );
};

Rate.propTypes = {
  rate: PropTypes.object.isRequired,
  showDescription: PropTypes.bool,
};

export default Rate;
