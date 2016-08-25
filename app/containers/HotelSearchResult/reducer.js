import { fromJS } from 'immutable';
import {
  SORT_HOTELS,
  FILTER_BY_STAR,
  DISPLAY_HOTELS,
} from './constants';

const initialState = fromJS({
  filters: {
    stars: {},
  },
  sort: {
    column: 'PRICE',
    order: 'ASC',
  },
  displayedHotels: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_STAR:
      return state
        .setIn(['filters', 'stars', action.star], action.selected);
    case SORT_HOTELS:
      return state
        .set('sort', action.sort);
    case DISPLAY_HOTELS:
      return state
        .set('displayedHotels', action.hotels);
    default:
      return state;
  }
};
