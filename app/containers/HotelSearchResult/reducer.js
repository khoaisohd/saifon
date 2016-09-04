import { fromJS } from 'immutable';
import {
  SORT_HOTELS,
  FILTER_BY_STAR_RATINGS,
  DISPLAY_HOTELS,
  SEARCH_HOTELS,
  FILTER_HOTELS,
} from './constants';

const initialState = fromJS({
  filters: {
    starRatings: [],
  },
  sort: {
    column: 'PRICE',
    order: 'ASC',
  },
  displayedHotels: [],
  offset: 0,
  limit: 20,
  loading: true,
});

function hotelSearchResultReducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_BY_STAR_RATINGS:
      return state
        .setIn(['filters', 'starRatings'], action.starRatings);
    case SORT_HOTELS:
      return state
        .set('sort', action.sort);
    case DISPLAY_HOTELS:
      return state
        .set('displayedHotels', action.hotels)
        .set('loading', false);
    case SEARCH_HOTELS:
      return initialState;
    case FILTER_HOTELS:
      return state.set('loading', true);
    default:
      return state;
  }
}

export default hotelSearchResultReducer;
