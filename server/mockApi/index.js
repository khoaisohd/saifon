const hotelSearch = require('./hotel-search.json');

const mockApi = app => {
  app.post('/api/hotel/search', (req, res) => res.json(hotelSearch));
};

module.exports = mockApi;
