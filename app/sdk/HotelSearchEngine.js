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
      .then((hotels) => this.filter(hotels, filters))
      .then((hotels) => hotels.slice(offset, limit));
  }

  filter(hotels, filters) {
    const starRatings = filters.get('starRatings');
    return hotels.filter((hotel) =>
      this.hasTheStarsAligned(hotel, starRatings)
    );
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
