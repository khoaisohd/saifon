import {
  DISPLAY_HOTELS,
  SORT_HOTELS,
  FILTER_BY_STAR_RATINGS,
  SEARCH_HOTELS,
  FILTER_HOTELS,
} from './constants';

export const sortHotels = sort => ({
  type: SORT_HOTELS,
  sort,
});

export const filterByStarRatings = (starRatings) => ({
  type: FILTER_BY_STAR_RATINGS,
  starRatings,
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
