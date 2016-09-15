# Routing via `react-router`
`react-router` is the standard routing solution for react application.  
Check [React router](https://github.com/ReactTraining/react-router) for more information

## Usage
This is what a standard route looks like for a container
```JS
{
  path: '/hotels',
  name: 'hotel-search-form',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      System.import('containers/HotelSearchForm'),
    ]);

    const renderRoute = loadModule(cb);

    importModules.then(([component]) => {
      renderRoute(component);
    });

    importModules.catch(errorLoading);
  },
}
```

## Child routes
That is how we add `check-in-picker` child route within `hotel-search-form` route
```JS
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
  },
  childRoutes: [
    {
      path: '/hotels/check-in-picker',
      name: 'hotel-search-form-check-in-picker',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HotelSearchForm/CheckInPicker'),
        ]);
  
        const renderRoute = loadModule(cb);
  
        importModules.then(([component]) => {
          renderRoute(component);
        });
  
        importModules.catch(errorLoading);
      },
    },
  ]
}
```


## Dynamic routes
Webpack provides `System.import` to load remote assets
```JS
System.import('containers/Post/reducer')
System.import('containers/Post')
```
In `hotel-search-result` route, that is how  we load and make use of `container, reducer, sagas` assets 
```JS
{
  path: HOTEL_SEARCH_PATH_PATTERN,
  name: 'hotel-search-result',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      System.import('containers/HotelSearchResult/reducer'),
      System.import('containers/HotelSearchResult/sagas'),
      System.import('containers/HotelSearchResult'),
    ]);

    const renderRoute = loadModule(cb);

    importModules.then(([reducer, sagas, component]) => {
      injectReducer('HotelSearchResult', reducer.default);
      injectSagas('HotelSearchResult', sagas.default);
      renderRoute(component);
    });

    importModules.catch(errorLoading);
  }
}
```

