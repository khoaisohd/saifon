# Routing via `react-router` and `react-router-redux`
`React Router` is the standard routing solution for react application. The thing is that with `redux` and `react-router-redux`, the URL is 
part of that state. `react-router-state` takes care of synchronizing the location of our application with the application state.

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

## Clickable link
