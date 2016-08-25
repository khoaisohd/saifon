import {
  DISPLAY_HOTELS,
  SORT_HOTELS,
  FILTER_BY_STAR,
} from './constants';
import HotelSearchApi from 'sdk/HotelSearchApi';
import { fromJS } from 'immutable';

export const sortHotels = sort => ({
  type: SORT_HOTELS,
  sort,
});

export const filterByStar = (star, selected) => ({
  type: FILTER_BY_STAR,
  star,
  selected,
});

export const displayHotels = hotels => ({
  type: DISPLAY_HOTELS,
  hotels,
});

export const searchHotels = search => dispatch => {
  const api = new HotelSearchApi();
  api.searchHotels({ search }).then(response => dispatch(displayHotels(fromJS(response.hotels))));
};
