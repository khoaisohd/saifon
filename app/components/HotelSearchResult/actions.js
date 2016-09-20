import {
  SORT_HOTELS,
  TOGGLE_STAR_RATING_FILTER,
  FETCH_HOTELS,
  FIND_HOTELS,
  UPDATE_FILTER,
  FILTER_BY_PRICE,
  DISPLAY_RESULT,
} from './constants';

export const sortHotels = sort => ({
  type: SORT_HOTELS,
  sort,
});

export const toggleStarRatingFilter = (starRating) => ({
  type: TOGGLE_STAR_RATING_FILTER,
  starRating,
});

export const fetchHotels = search => ({
  type: FETCH_HOTELS,
  search,
});

export const findHotels = () => ({
  type: FIND_HOTELS,
});

export const updateFilter = filter => ({
  type: UPDATE_FILTER,
  filter,
});

export const filterByPrice = (minPrice, maxPrice) => ({
  type: FILTER_BY_PRICE,
  minPrice,
  maxPrice,
});

export const displayResult = hotels => ({
  type: DISPLAY_RESULT,
  hotels,
});
