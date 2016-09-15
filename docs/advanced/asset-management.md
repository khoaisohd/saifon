# Asset Management

Webpack is our savior

## Dynamic Routing + Webpack

Webpack compiles page asset chunks  

Example: Webpack builds javascript chunks for `HotelSearchForm`, `HotelSearchResult` with the following `routes` config

```JS
[
  {
    path: '/hotels',
    name: 'hotel-search-form',
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        System.import('containers/HotelSearchForm')
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([component]) => {
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    }
  },
  {
      path: '/hotels',
      name: 'hotel-search-result',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HotelSearchResult')
        ]);
  
        const renderRoute = loadModule(cb);
  
        importModules.then(([component]) => {
          renderRoute(component);
        });
  
        importModules.catch(errorLoading);
      }
    },
[
```

## Asset grouping
Problem

``` 
We have different dynamic routes for `hotel-search-form` and `hotel-search-form-check-in`

Inside `hotel-search-form`, how do we navigate to `check-in` in without loading 
`containers/HotelSearchForm/CheckInPicker` assets?
```

Webpack will bundle `containers/HotelSearchForm/CheckInPicker` into `hotel-search-form` assets, 
if in `containers/HotelSearchForm/index.js` you include

```JS
import 'containers/HotelSearchForm/CheckInPicker';
```

## Preloaded resource