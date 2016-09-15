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
Scenario: 
1. We have different dynamic routes for `hotel-search-form` and `hotel-search-form-check-in`
1. We want to include `hotel-search-form-check-in` inside `hotel-search-form` so that inside `hotel-search-form`, when we click `check in` 
it'll load `containers/HotelSearchForm/CheckInPicker` script before rendering

```
{
  path: '/hotels',
  name: 'hotel-search-form',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      System.import('containers/HotelSearchForm/reducer'),
      System.import('containers/HotelSearchForm'),
    ]);

    const renderRoute = loadModule(cb);

    importModules.then(([reducer, component]) => {
      injectReducer('HotelSearchForm', reducer.default);
      renderRoute(component);
      System.import('containers/HotelSearchResult/reducer');
      System.import('containers/HotelSearchResult/sagas');
      System.import('containers/HotelSearchResult');
    });

    importModules.catch(errorLoading);
  },
},
{
  path: '/hotels/overlay/check-in',
  name: 'hotel-search-form-check-in',
  getComponent(nextState, cb) {
    System.import('containers/HotelSearchForm/CheckInPicker')
      .then(loadModule(cb))
      .catch(errorLoading);
  },
},
```

## Preloaded resource