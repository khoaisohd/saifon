import { fromJS } from 'immutable';
import {
  STORE_SORT,
  ADD_FILTER_STAR_TYPE,
  REMOVE_FILTER_STAR_TYPE,
  STORE_HOTELS,
} from './constants';

const initialState = fromJS({
  filter: {
    starTypes: [],
  },
  sort: {
    column: 'PRICE',
    order: 'ASC'
  },
  hotels: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILTER_STAR_TYPE:
      return state.setIn(['filter', 'starTypes'], starTypes => starTypes.push(action.starType));
    case REMOVE_FILTER_STAR_TYPE:
      return state.setIn(['filter', 'starTypes'], starTypes => starTypes.delete(action.starType));
    case STORE_SORT:
      return state
        .set('sort', action.sort);
    case STORE_HOTELS:
      return state
        .set('hotels', action.hotels);
    default:
      return state;
  }
}
