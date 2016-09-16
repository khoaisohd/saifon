# Architect

The `app/` directory contains entire application code including CSS, Javascript, HTML and tests
 
```
app
  components
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

## Business-oriented over technical-oriented Structure

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
