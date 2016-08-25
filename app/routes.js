// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Home'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    // Hotel Search Form
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
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/hotels/overlay/date-picker',
      name: 'hotel-search-form-date-picker',
      getComponent(nextState, cb) {
        System.import('containers/HotelSearchForm/DatePicker')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '/hotels/overlay/location-picker',
      name: 'hotel-search-form-location-picker',
      getComponent(nextState, cb) {
        System.import('containers/HotelSearchForm/LocationPicker')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '/hotels/overlay/travellers-picker',
      name: 'hotel-search-form-travellers-picker',
      getComponent(nextState, cb) {
        System.import('containers/HotelSearchForm/TravellersPicker')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    // Hotel Search Result
    {
      path: '/hotels/:locationId/:checkIn/:checkOut/:guestsCount/:roomsCount',
      name: 'hotel-search-result',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HotelSearchResult/reducer'),
          System.import('containers/HotelSearchResult'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('HotelSearchResult', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/hotels/:locationId/:checkIn/:checkOut/:guestsCount/:roomsCount/overlay/filters',
      name: 'hotel-search-result-filters',
      getComponent(nextState, cb) {
        System.import('containers/HotelSearchResult/Filters')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
