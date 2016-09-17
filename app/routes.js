// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'helpers/asyncInjectorHelper';
import { HOTEL_SEARCH_PATH_PATTERN } from 'helpers/routeHelper';

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
          System.import('components/Home'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
          System.import('components/HotelSearchForm/reducer');
          System.import('components/HotelSearchForm');
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/hotels',
      name: 'hotel-search-form',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('components/HotelSearchForm/reducer'),
          System.import('components/HotelSearchForm'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('HotelSearchForm', reducer.default);
          renderRoute(component);
          System.import('components/HotelSearchResult/reducer');
          System.import('components/HotelSearchResult/sagas');
          System.import('components/HotelSearchResult');
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/hotels/modal/check-in',
      name: 'hotel-search-form-check-in',
      getComponent(nextState, cb) {
        System.import('components/HotelSearchForm/CheckInPicker')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '/hotels/modal/check-out',
      name: 'hotel-search-form-check-out',
      getComponent(nextState, cb) {
        System.import('components/HotelSearchForm/CheckOutPicker')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '/hotels/modal/location-picker',
      name: 'hotel-search-form-location-picker',
      getComponent(nextState, cb) {
        System.import('components/HotelSearchForm/LocationPicker')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '/hotels/modal/travellers-picker',
      name: 'hotel-search-form-travellers-picker',
      getComponent(nextState, cb) {
        System.import('components/HotelSearchForm/TravellersPicker')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: HOTEL_SEARCH_PATH_PATTERN,
      name: 'hotel-search-result',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('components/HotelSearchResult/reducer'),
          System.import('components/HotelSearchResult/sagas'),
          System.import('components/HotelSearchResult'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('HotelSearchResult', reducer.default);
          injectSagas('HotelSearchResult', sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: `${HOTEL_SEARCH_PATH_PATTERN}/modal/filter`,
          name: 'hotel-search-result-filter',
          getComponent(nextState, cb) {
            System.import('components/HotelSearchResult/Filter')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
        {
          path: `${HOTEL_SEARCH_PATH_PATTERN}/modal/hotels/:hotelId`,
          name: 'hotel-search-result-hotel-details',
          getComponent(nextState, cb) {
            System.import('components/HotelSearchResult/HotelDetails')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
      ],
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('components/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
