# SDK
SDK should be as minimal as possible
## API

`sdk/Api/index.js` is the place we declare our API calls
    
```JS
{
  searchHotels: search => apiCaller.post('/api/hotel/search', { search }),

  searchHotelLocation: keyword => apiCaller.post('/api/hotel/location/search', { keyword }),

  fetchHotelDetails: (search, hotelId) => apiCaller.get('/api/hotel/details', { search, hotelId }),
}

```    
## HotelSearchEngine
`Singleton` pattern
```JS
let instance = null;

export const getHotelSearchEngine = () => {
  if (instance === null) {
    instance = new HotelSearchEngine();
  }
  return instance;
};
```

Polling and storing hotels
```JS
poll() {
  return Api.searchHotels(this.search).then(response => {
    this.setHotels(response.hotels);
    return Promise.resolve(response);
  });
}
```

Find hotels
```JS
findHotels(filters = new Map(), sort) {
  return Promise.resolve(this.hotels)
    .then(hotels => filterHotels(hotels, filters))
    .then(filteredHotels => sortHotels(filteredHotels, sort));
}
```