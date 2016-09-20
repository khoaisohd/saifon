import { fromJS, Map } from 'immutable';
import {
  SORT_HOTELS,
  TOGGLE_STAR_RATING_FILTER,
  FETCH_HOTELS,
  UPDATE_FILTER,
  FILTER_BY_PRICE,
  DISPLAY_RESULT,
} from './constants';
import store from './store';

const initialState = fromJS({
  filter: {
    stars: {
      5: { selected: true },
      4: { selected: true },
      3: { selected: true },
      2: { selected: true },
      1: { selected: true },
    },
    minPrice: {
      value: 0,
      threshold: 0,
    },
    maxPrice: {
      value: 10000,
      threshold: 10000,
    },
  },
  sort: {
    property: 'PRICE',
    order: 'ASC',
  },
  hasNoResult: false,
  loading: true,
});

function hotelSearchResultReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_STAR_RATING_FILTER:
      store.setDisplayedHotels(fromJS([]));
      return state
        .setIn(['filter', 'stars', action.starRating, 'selected'],
          !state.getIn(['filter', 'stars', action.starRating, 'selected']));
    case SORT_HOTELS:
      store.setDisplayedHotels(fromJS([]));
      return state
        .set('loading', true)
        .set('sort', action.sort);
    case FETCH_HOTELS:
      store.setDisplayedHotels(fromJS([]));
      return initialState;
    case UPDATE_FILTER:
      return state
        .mergeDeep(new Map({ filter: action.filter }));
    case FILTER_BY_PRICE:
      store.setDisplayedHotels(fromJS([]));
      return state
        .setIn(['filter', 'minPrice', 'value'], action.minPrice)
        .setIn(['filter', 'maxPrice', 'value'], action.maxPrice);
    case DISPLAY_RESULT:
      store.setDisplayedHotels(action.hotels);
      return state
        .set('hasNoResult', action.hotels.isEmpty())
        .set('loading', false);
    default:
      return state;
  }
}

export default hotelSearchResultReducer;
