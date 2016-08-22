import { fromJS } from 'immutable';
import {
  STORE_SORT,
  ADD_FILTER_STAR_TYPE,
  REMOVE_FILTER_STAR_TYPE,
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
  bestRates: null,
  hotelsCount: null,
  priceRange: null,
  offset: 0,
  limit: 20,
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
    default:
      return state;
  }
}
