import { fromJS } from 'immutable';

class HotelSearchResultStore {
  constructor() {
    this.dispalyedHotels = fromJS([]);
  }

  setDisplayedHotels(hotels) {
    this.dispalyedHotels = hotels;
  }

  getDisplayedHotels() {
    return this.dispalyedHotels;
  }
}

export default new HotelSearchResultStore();
