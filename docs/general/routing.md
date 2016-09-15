# Routing via `react-router` and `react-router-redux`
`React Router` is the standard routing solution for react application. The thing is that with `redux` and `react-router-redux`, the URL is 
part of that state. `react-router-state` takes care of synchronizing the location of our application with the application state.

## Usage
This is what a standard route looks like for a container:
```JS
{
  path: '/',
  name: 'home',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      System.import('containers/HomePage')
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


## Dynamic routes

## Clickable link
