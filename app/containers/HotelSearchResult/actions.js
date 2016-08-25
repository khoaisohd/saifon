import {
  STORE_HOTELS,
  STORE_SORT,
  ADD_FILTERS_STAR_TYPE,
  REMOVE_FILTERS_STAR_TYPE,
} from './constants';
import HotelSearchApi from 'sdk/HotelSearchApi';
import { fromJS } from 'immutable';

export const storeSort = sort => ({
  type: STORE_SORT,
  sort,
});

export const addFilterStarType = starType => ({
  type: ADD_FILTERS_STAR_TYPE,
  starType,
});

export const removeFilterStarType = starType => ({
  type: REMOVE_FILTERS_STAR_TYPE,
  starType,
});

export const submitSearch = search => dispatch => {
  const api = new HotelSearchApi();

  api.submitSearch({ search }).then(response => dispatch({
    hotels: fromJS(response.hotels),
    type: STORE_HOTELS,
  }));
};
