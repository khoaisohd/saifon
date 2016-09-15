# Architect
The `app/` directory contains entire application code including CSS, Javascript, HTML and tests 
```
app
  components
  containers
  sdk
  utils
  app.js
  reducers.js
  routes.js
  store.js
  index.html
  
build
docs
internal
server
```
  
## React Components - Dum && Smart 
Dum components are put under `app/components`  
Smart components are put under `app/containers`  
```
components  
  HotelCard
  DatePicker
  StarRating
  Stepper
containers  
  App
  Home
  HotelSearchForm
  HotelSearchResult
  NotFoundPage
```  
Sub smart components are put under their parent smart components
```
containers
  HotelSearchForm
    CheckInPicker
    CheckOutPicker
    LocationPicker
    TravellersPicker
```

## Business oriented over Technical oriented Structure
Instead of having `reducers`, `constants`, `actions`, `sagas` repos  
```
reducers  
  HotelSearchFormReducer.js  
  HotelSearchResultReducer.js  
constants  
  HotelSearchFormConstants.js  
  HotelSearchResultConstants.js  
actions  
  HotelSearchFormActions.js  
  HotelSearchResultActions.js  
sagas  
  HotelSearchFormSagas.js  
  HotelSearchResultSagas.js  
```  

Each smart component has its own `reducer`, `constants`, `actions`, `sagas` files  
```
HotelSearchForm  
  index.js  
  reducer.js  
  constants.js  
  actions.js  
  sagas.js  
HotelSearchResult  
  index.js  
  reducer.js  
  constants.js  
  actions.js  
  sagas.js  
```