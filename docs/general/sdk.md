# SDK
SDK should be as simple as possible  

```
The less computation, the simpler
```

## API

We declare our API calls in `sdk/Api/index.js`
    
```JS
{
  searchHotels: search => apiCaller.post('/api/hotel/search', { search }),

  searchHotelLocation: keyword => apiCaller.post('/api/hotel/location/search', { keyword }),

  fetchHotelDetails: (search, hotelId) => apiCaller.get('/api/hotel/details', { search, hotelId }),
}
```    

## HotelSearchEngine
Make a request to server then store returned hotels.
```JS
poll() {
  return Api.searchHotels(this.search).then(response => {
    this.setHotels(response.hotels);
    return Promise.resolve(response);
  });
}
```

When having `hotels`, engine can do filtering and sorting
```JS
findHotels(filters = new Map(), sort) {
  return Promise.resolve(this.hotels)
    .then(hotels => filterHotels(hotels, filters))
    .then(filteredHotels => sortHotels(filteredHotels, sort));
}
```