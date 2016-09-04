import {
  DISPLAY_HOTELS,
  SORT_HOTELS,
  TOGGLE_STAR_RATING_FILTER,
  SEARCH_HOTELS,
  FILTER_HOTELS,
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

export const searchHotels = search => ({
  type: SEARCH_HOTELS,
  search,
});

export const filterHotels = () => ({
  type: FILTER_HOTELS,
});
