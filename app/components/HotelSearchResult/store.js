class HotelSearchResultStore {
  constructor() {
    this.dispalyedHotels = [];
  }

  clear() {
    this.dispalyedHotels = [];
  }

  setDisplayedHotels(hotels) {
    this.dispalyedHotels = hotels;
  }

  getDisplayedHotels() {
    return this.dispalyedHotels;
  }
}

export default new HotelSearchResultStore();
