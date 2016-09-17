import React, { Component } from 'react';
import styles from './styles.css';
import Api from 'sdk/Api';
import StarRating from 'components/shared/StarRating';
import moment from 'moment';
import { DATE_FORMAT } from 'helpers/dateHelper';
import { CURRENCIES } from 'helpers/priceHelper';
import ModalHeader from 'components/shared/ModalHeader';

class HotelDetails extends Component {
  constructor(props) {
    super(props);
    const { checkIn, checkOut, guestsCount, locationCode, roomsCount, hotelId } = props;

    this.state = {
      isFetching: true,
      hotel: null,
    };

    Api.fetchHotelDetails({ checkIn, checkOut, guestsCount, locationCode, roomsCount }, hotelId).then(response => {
      this.setState({
        isFetching: false,
        hotel: response.hotel,
      });
    });
  }

  renderLoading() {
    return (<div>Fetching...</div>);
  }

  renderRate(rate) {
    return (
      <div key={rate.id} className={styles.rateContainer}>
        <div>{rate.provider.name}</div>
        <div className={styles.ratePrice}>{CURRENCIES[rate.price.currencyCode].symbol}{rate.price.amount}</div>
      </div>
    );
  }

  renderDetails() {
    const { hotel } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.hotelImage} style={{ backgroundImage: `url(${hotel.imageUrl})` }} />
        <div className={styles.hotelName}>
          {hotel.name}
          <StarRating value={hotel.star} />
        </div>
        <div className={styles.hotelDates}>
          {moment(hotel.checkIn, DATE_FORMAT).format('dddd, D MMM')} to {moment(hotel.checkOut, DATE_FORMAT).format('dddd, D MMM')} for {hotel.nights} nights
        </div>
        <div className={styles.hotelRates}>{hotel.rates.map(rate => this.renderRate(rate))}</div>

        <div className={styles.descriptionContainer}>
          <b>Description</b>
          <div>{hotel.description}</div>
        </div>
      </div>);
  }

  render() {
    return (
      <div>
        <ModalHeader title="Hotel Details" />
        { this.state.isFetching ? this.renderLoading() : this.renderDetails() }
      </div>
    );
  }
}

HotelDetails.contextTypes = {
  router: React.PropTypes.object,
};

export default HotelDetails;
