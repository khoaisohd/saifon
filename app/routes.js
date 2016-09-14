// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import 'containers/Home';
import { getAsyncInjectors } from 'utils/asyncInjectors';
import { HOTEL_SEARCH_PATH_PATTERN } from 'utils/routes-util';

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
          System.import('containers/HotelSearchForm/reducer');
          System.import('containers/HotelSearchForm');
        });

        importModules.catch(errorLoading);
      },
    },
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
    {
      path: '/hotels/overlay/check-out',
      name: 'hotel-search-form-check-out',
      getComponent(nextState, cb) {
        System.import('containers/HotelSearchForm/CheckOutPicker')
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
      },
      childRoutes: [
        {
          path: `${HOTEL_SEARCH_PATH_PATTERN}/overlay/filter`,
          name: 'hotel-search-result-filter',
          getComponent(nextState, cb) {
            System.import('containers/HotelSearchResult/Filter')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
        {
          path: `${HOTEL_SEARCH_PATH_PATTERN}/overlay/hotels/:hotelId`,
          name: 'hotel-search-result-hotel-details',
          getComponent(nextState, cb) {
            System.import('containers/HotelSearchResult/HotelDetails')
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
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
