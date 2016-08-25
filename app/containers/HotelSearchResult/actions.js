import {
  DISPLAY_HOTELS,
  SORT_HOTELS,
  ADD_FILTERS_STAR_TYPE,
  REMOVE_FILTERS_STAR_TYPE,
} from './constants';
import HotelSearchApi from 'sdk/HotelSearchApi';
import { fromJS } from 'immutable';

export const sortHotels = sort => ({
  type: SORT_HOTELS,
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

export const displayHotels = hotels => ({
  type: DISPLAY_HOTELS,
  hotels,
});

export const submitSearch = search => dispatch => {
  const api = new HotelSearchApi();
  api.submitSearch({ search }).then(response => dispatch(displayHotels(fromJS(response.hotels))));
};
