# Development
Freedom lies in being bold

## Process
1. API discussion and documentation
1. Create a mock API server for frontend
1. Develop frontend and backend in parallel according to API documentation
1. Integration

## Mock Api Server
Sample
```JS
const mockApi = app => {
  app.post('/api/hotel/search', (req, res) => res.json(hotelSearch));

  app.post('/api/hotel/location/search', (req, res) => {
    const num = parseInt((req.body.keyword.length - 1) / 2, 10);
    res.json(hotelLocations[Math.min(num, 2)]);
  });

  app.get('/api/hotel/details', (req, res) => res.json(hotelDetails));
};
```
