# SDK
## API

`sdk/Api/index.js` is the place we declare our Api
    
```JS
{
  searchHotels: search => apiCaller.post('/api/hotel/search', { search }),

  searchHotelLocation: keyword => apiCaller.post('/api/hotel/location/search', { keyword }),

  fetchHotelDetails: (search, hotelId) => apiCaller.get('/api/hotel/details', { search, hotelId }),
}

```    
## HotelSearchEngine