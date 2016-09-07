import { fromJS } from 'immutable';
import {
  SORT_HOTELS,
  TOGGLE_STAR_RATING_FILTER,
  DISPLAY_HOTELS,
  FETCH_HOTELS,
  LOAD_MORE,
} from './constants';

const initialState = fromJS({
  filters: {
    starRatings: {
      5: { selected: true },
      4: { selected: true },
      3: { selected: true },
      2: { selected: true },
    },
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
    case TOGGLE_STAR_RATING_FILTER:
      return state
        .setIn(['filters', 'starRatings', action.starRating, 'selected'],
          !state.getIn(['filters', 'starRatings', action.starRating, 'selected']))
        .set('limit', 20);
    case SORT_HOTELS:
      return state
        .set('sort', action.sort)
        .set('limit', 20);
    case DISPLAY_HOTELS:
      return state
        .set('displayedHotels', action.hotels)
        .set('loading', false);
    case FETCH_HOTELS:
      return initialState;
    case LOAD_MORE:
      return state
        .set('limit', state.get('limit') + 20)
        .set('loading', true);
    default:
      return state;
  }
}

export default hotelSearchResultReducer;
