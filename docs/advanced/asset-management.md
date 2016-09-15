# Asset Management

Webpack is our savior

## Page resource

With React Dynamic Router, Webpack compiles asset chucks for each page  

Example: Webpack builds javascript chunks for `HotelSearchForm`, `HotelSearchResult` with the following `routes`

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

## Preloaded resource