import Api from 'sdk/Api';
import filterHotels from './filterHotels';
import sortHotels from './sortHotels';

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

  findHotels(filters = new Map(), sort) {
    return Promise.resolve(this.hotels)
      .then((hotels) => filterHotels(hotels, filters))
      .then((filteredHotels) => sortHotels(filteredHotels, sort));
  }
}

export default HotelSearchEngine;
