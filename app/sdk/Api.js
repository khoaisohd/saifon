import ApiCaller from './ApiCaller';

const apiCaller = new ApiCaller();

const Api = {
  searchHotels: search => apiCaller.post('/Api/hotel/search', { search }),
};

export default Api;
