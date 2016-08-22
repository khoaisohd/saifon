import {
  STORE_SEARCH,
  STORE_SORT,
  ADD_FILTER_STAR_TYPE,
  REMOVE_FILTER_STAR_TYPE,
} from './constants';

export const storeSearch = search => ({
  type: STORE_SEARCH,
  search,
});

export const storeSort = sort => ({
  type: STORE_SORT,
  sort,
});

export const storeFilter = filter => ({
  type: STORE_FILTER,
  filter,
});

export const addFilterStarType = starType => ({
  type: ADD_FILTER_STAR_TYPE,
  starType,
});

export const removeFilterStarType = starType => ({
  type: REMOVE_FILTER_STAR_TYPE,
  starType,
});

export const submitSearch = (search, filter, sort, offset, limit) => {
  console.log(search.toJS());
  console.log(filter.toJS());
  console.log(sort.toJS());
  console.log(offset);
  console.log(limit);
  return {
    type: 'SEARCH',
  };
};