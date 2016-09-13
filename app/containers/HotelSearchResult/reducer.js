import { fromJS, Map } from 'immutable';
import {
  SORT_HOTELS,
  TOGGLE_STAR_RATING_FILTER,
  FETCH_HOTELS,
  LOAD_MORE,
  UPDATE_FILTER,
  FILTER_BY_PRICE,
  DISPLAY_RESULT,
} from './constants';

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
  displayedHotels: [],
  hasNoResult: false,
  canLoadMore: true,
  offset: 0,
  limit: 20,
  loading: true,
});

function hotelSearchResultReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_STAR_RATING_FILTER:
      return state
        .setIn(['filter', 'stars', action.starRating, 'selected'],
          !state.getIn(['filter', 'stars', action.starRating, 'selected']))
        .set('limit', 20);
    case SORT_HOTELS:
      return state
        .set('displayedHotels', fromJS([]))
        .set('loading', true)
        .set('sort', action.sort)
        .set('limit', 20);
    case FETCH_HOTELS:
      return initialState;
    case LOAD_MORE:
      return state
        .set('limit', state.get('limit') + 20)
        .set('loading', true);
    case UPDATE_FILTER:
      return state
        .mergeDeep(new Map({ filter: action.filter }));
    case FILTER_BY_PRICE:
      return state
        .setIn(['filter', 'minPrice', 'value'], action.minPrice)
        .setIn(['filter', 'maxPrice', 'value'], action.maxPrice)
        .set('limit', 20);
    case DISPLAY_RESULT:
      return state
        .set('displayedHotels', action.hotels)
        .set('hasNoResult', action.hasNoResult)
        .set('canLoadMore', action.canLoadMore)
        .set('loading', false);
    default:
      return state;
  }
}

export default hotelSearchResultReducer;
