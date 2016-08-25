import Api from './Api';
const hotelSearchPath = 'api/hotel/search';

class HotelSearchApi {
  constructor(host = '', headers = {}) {
    this.host = host;
    this.headers = headers;
  }

  searchHotels(request) {
    const api = new Api(`${this.host}/${hotelSearchPath}`, this.headers);
    return api.post(request);
  }
}

export default HotelSearchApi;
