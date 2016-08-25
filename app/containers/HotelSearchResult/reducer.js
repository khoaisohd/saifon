import { fromJS, Set } from 'immutable';
import {
  STORE_SORT,
  ADD_FILTERS_STAR_TYPE,
  REMOVE_FILTERS_STAR_TYPE,
  STORE_HOTELS,
} from './constants';

const initialState = fromJS({
  filter: {
    starTypes: new Set(),
  },
  sort: {
    column: 'PRICE',
    order: 'ASC',
  },
  hotels: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILTERS_STAR_TYPE:
      return state.updateIn(['filters', 'starTypes'], starTypes => starTypes.add(action.starType));
    case REMOVE_FILTERS_STAR_TYPE:
      return state.updateIn(['filters', 'starTypes'], starTypes => starTypes.delete(action.starType));
    case STORE_SORT:
      return state
        .set('sort', action.sort);
    case STORE_HOTELS:
      return state
        .set('hotels', action.hotels);
    default:
      return state;
  }
};
