import { fromJS } from 'immutable';
import {
  SORT_HOTELS,
  TOGGLE_STAR_RATING_FILTER,
  DISPLAY_HOTELS,
} from './constants';

const initialState = fromJS({
  filters: {
    starRatings: {},
  },
  sort: {
    column: 'PRICE',
    order: 'ASC',
  },
  displayedHotels: [],
});

function hotelSearchResultReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_STAR_RATING_FILTER:
      return state
        .setIn(['filters', 'starRatings', action.starRating], !state.getIn(['filters', 'starRatings', action.starRating]));
    case SORT_HOTELS:
      return state
        .set('sort', action.sort);
    case DISPLAY_HOTELS:
      return state
        .set('displayedHotels', action.hotels);
    default:
      return state;
  }
}

export default hotelSearchResultReducer;
