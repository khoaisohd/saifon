import Api from './Api';
const hotelSearchPath = 'api/hotel/search';

class HotelSearchApi {
  constructor(host = '', headers = {}) {
    this._host = host;
    this._headers = headers;
  }

  submitSearch(request) {
    const api = new Api(`${this._host}/${hotelSearchPath}`, this._headers);
    return api.post(request);
  }
}

export default HotelSearchApi;
