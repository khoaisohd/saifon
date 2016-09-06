import Api from './Api';
import { List, Map } from 'immutable';

class HotelSearchEngine {
  constructor() {
    this.hotels = [];
    this.search = null;
  }

  setSearch(search) {
    this.search = search;
  }

  setHotels(hotels) {
    this.hotels = hotels;
  }

  poll() {
    return Api.searchHotels(this.search).then(response => {
      this.setHotels(response.hotels);
      return Promise.resolve(response);
    });
  }

  findHotels(filters = new Map(), sort, offset = 0, limit = 20) {
    return Promise.resolve(this.hotels)
      .then((hotels) => this.filterHotels(hotels, filters))
      .then((filteredHotels) => this.sortHotels(filteredHotels, sort))
      .then((sortedHotels) => sortedHotels.slice(offset, limit));
  }

  filterHotels(hotels, filters) {
    const starRatings = filters.get('starRatings');
    return hotels.filter((hotel) =>
      this.hasTheStarsAligned(hotel, starRatings)
    );
  }

  sortHotels(hotels, sortData) {
    const sorter = this.sortBy(sortData);
    return hotels.sort(sorter);
  }

  sortBy(sortData) {
    let getSortValue;
    switch (sortData.get('property')) {
      case 'PRICE':
        getSortValue = this.getCheapestAmount;
        break;
      case 'REVIEW_SCORE':
        getSortValue = this.getReviewScore;
        break;
      case 'STAR_RATING':
        getSortValue = this.getStarRating;
        break;
      default:
        break;
    }
    return (hotelA, hotelB) => {
      const valA = getSortValue(hotelA);
      const valB = getSortValue(hotelB);
      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;
      return (valA > valB) === (sortData.get('order') === 'ASC') ? 1 : -1;
    };
  }

  getCheapestAmount(hotel) {
    return hotel.cheapestRate.price.amount;
  }

  getReviewScore(hotel) {
    return parseInt(hotel.reviewScore);
  }

  getStarRating(hotel) {
    return Math.round(hotel.star);
  }

  hasTheStarsAligned(hotel, starRatings = new List()) {
    const rating = Math.floor(hotel.star);
    return starRatings.isEmpty() || starRatings.getIn([rating.toString(), 'selected']);
  }
}

let instance = null;

export const getHotelSearchEngine = () => {
  if (instance === null) {
    instance = new HotelSearchEngine();
  }
  return instance;
};


export default HotelSearchEngine;
