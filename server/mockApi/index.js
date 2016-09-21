const hotelSearch = require('./hotel-search.json');
const hotelLocation1 = require('./hotel-location-1.json');
const hotelLocation2 = require('./hotel-location-2.json');
const hotelLocation3 = require('./hotel-location-3.json');
const hotelLocations = [hotelLocation1, hotelLocation2, hotelLocation3];
const hotelDetails = require('./hotel-details.json');

const mockApi = app => {
  let count = 0;
  app.post('/api/hotel/search', (req, res) => {
    hotelSearch.completed = count === 9;
    res.json(hotelSearch);
    count = (count + 1) % 10;
  });

  app.post('/api/hotel/location/search', (req, res) => {
    const num = parseInt((req.body.keyword.length - 1) / 2, 10);
    res.json(hotelLocations[Math.min(num, 2)]);
  });

  app.get('/api/hotel/details', (req, res) => res.json(hotelDetails));
};

module.exports = mockApi;
