import Caller from './Caller';

const caller = new Caller();

const api = {
  searchHotels: search => caller.post('/api/hotel/search', { search }),
};

export default api;
