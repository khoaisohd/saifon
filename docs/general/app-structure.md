# App Structure
## Application code
The `app/` directory contains entire application code, including CSS, Javascript, HTML and tests  
  
## Flatten Component Structure  
Dummy components are put under `app/components`  
Smart components are put under `app/containers`  

## Business oriented over technical oriented structure
Instead of having `reducers`, `constants`, `actions`, `sagas` as repos  
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

Each smart component has its own `reducer`, `constants`, `actions`  
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