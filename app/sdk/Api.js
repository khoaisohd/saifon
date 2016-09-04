import ApiCaller from './ApiCaller';

const apiCaller = new ApiCaller();

const Api = {
  searchHotels: search => apiCaller.post('/api/hotel/search', { search }),

  searchHotelLocation: keyword => apiCaller.post('/api/hotel/location/search', { keyword }),
};

export default Api;
