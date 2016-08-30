class HotelSearchResultStore {
  constructor() {
    this.hotels = [];
  }

  updateHotels(hotels) {
    this.hotels = hotels;
  }

  getDisplayedHotels(filters, sort, offset, limit) {
    return this.hotels.slice(offset, limit);
  }
}

let instance = null;

export const getStore = () => {
  if (instance === null) {
    instance = new HotelSearchResultStore();
  }
  return instance;
};

export default HotelSearchResultStore;
