# Asset Management

Webpack is awesome

## Dynamic Routing - Lazy Loading

Webpack compiles pages resources based on routing config  

Example: Webpack builds javascript chunks for `HotelSearchForm`, `HotelSearchResult`

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

## Resource grouping
Problem

``` 
We have `hotel-search-form` and `hotel-search-form-check-in` dynamic routes

So, from `hotel-search-form`, how do we open `check-in` page without loading resource?
```
 
The solution is in `containers/HotelSearchForm/index.js`  we include

```JS
import 'containers/HotelSearchForm/CheckInPicker';
```

Webpack will bundle `containers/HotelSearchForm/CheckInPicker` into `hotel-search-form` resource

## Preloaded resource
From `hotel-search-form`, users likely navigate to `hotel-search-result`, then we apply `resource grouping`  
And if from `hotel-search-form` user can go to `user preference`, then we `group resource` one more time  
...    
  
Oh, are we going against `lazy loading`?

```
  How do we make Lazy Loading hard working?
```

The solution is preloading other pages resources after rendering the current page
```JS
importModules.then(([component]) => {
  renderRoute(component);
  System.import('containers/HotelSearchResult');
});
```
