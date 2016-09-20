import React, { Component, PropTypes } from 'react';

import accounting from 'accounting';
import { CURRENCIES } from 'helpers/priceHelper';

import styles from './index.css';

const process = (amount, symbol, symbolFirst, thousand) => {
  const valueFormat = `<strong class=${styles.amount}>%v</strong>`;
  const symbolFormat = `<span class=${styles.code}>%s</span>`;

  const format = symbolFirst ?
    (symbolFormat + valueFormat) :
    (valueFormat + symbolFormat);

  return accounting.formatMoney(amount, {
    symbol, thousand, format, precision: 0,
  });
};

const supify = (formattedAmount, thousand) => {
  const sup = `<sup>${thousand}000</sup>`;
  const lookup = new RegExp(`\\${thousand}\\d{3}(?=[^${thousand}]*$)`, 'gi');
  return formattedAmount.replace(lookup, sup);
};

const display = html => ({ __html: html });

/*eslint-disable */
class Price extends Component {

  render() {
    const { amount, currencyCode } = this.props;
    const {
      symbol,
      symbolFirst,
      thousand,
      lowRate,
    } = CURRENCIES[currencyCode];

    let value = process(amount, symbol, symbolFirst, thousand);

    if (lowRate) { value = supify(value, thousand); }

    return <span className={`${styles.price}`} dangerouslySetInnerHTML={display(value)} />;
  }

}

Price.propTypes = {
  amount: PropTypes.number.isRequired,
  currencyCode: props => {
    if (!Object.prototype.hasOwnProperty.call(CURRENCIES, props.currencyCode)) {
      return new Error(`The currency code ${props.currencyCode} does not exist.`);
    }
  },
};
/*eslint-enable */
export default Price;
