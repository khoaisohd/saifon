import {
  DISPLAY_HOTELS,
  SORT_HOTELS,
  TOGGLE_STAR_RATING_FILTER,
  FETCH_HOTELS,
  FIND_HOTELS,
  LOAD_MORE,
  UPDATE_FILTER,
  FILTER_BY_PRICE,
} from './constants';

export const sortHotels = sort => ({
  type: SORT_HOTELS,
  sort,
});

export const toggleStarRatingFilter = (starRating) => ({
  type: TOGGLE_STAR_RATING_FILTER,
  starRating,
});

export const displayHotels = hotels => ({
  type: DISPLAY_HOTELS,
  hotels,
});

export const fetchHotels = search => ({
  type: FETCH_HOTELS,
  search,
});

export const findHotels = () => ({
  type: FIND_HOTELS,
});

export const loadMore = () => ({
  type: LOAD_MORE,
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
