import { fromJS } from 'immutable';
import {
  SORT_HOTELS,
  ADD_FILTERS_STAR_TYPE,
  REMOVE_FILTERS_STAR_TYPE,
  DISPLAY_HOTELS,
} from './constants';

const initialState = fromJS({
  filters: {
    starTypes: {},
  },
  sort: {
    column: 'PRICE',
    order: 'ASC',
  },
  displayedHotels: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILTERS_STAR_TYPE:
      return state
        .setIn(['filters', 'starTypes', action.starType], true);
    case REMOVE_FILTERS_STAR_TYPE:
      return state
        .setIn(['filters', 'starTypes', action.starType], false);
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
