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

  findHotels(filters, sort) {
    const delay = hotels => new Promise(resolve => {
      requestAnimationFrame(() => resolve(hotels));
    });

    return Promise.resolve(this.hotels)
      .then(delay)
      .then(hotels => filterHotels(hotels, filters))
      .then(delay)
      .then(filteredHotels => sortHotels(filteredHotels, sort))
      .then(delay)
      .then(hotels => Object.assign([], hotels))
      .then(delay);
  }
}

export default HotelSearchEngine;
