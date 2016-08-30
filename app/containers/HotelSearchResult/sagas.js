import { call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { fromJS } from 'immutable';
import { SEARCH_HOTELS } from './constants';
import { displayHotels } from './actions';
import api from 'api';
import { getStore } from './store';
import { getFilters, getSort, getOffset, getLimit } from './selectors';

export function* updateDisplayedHotels(hotels) {
  const store = getStore();
  store.updateHotels(hotels);
  const displayedHotels = store.getDisplayedHotels(
    yield select(getFilters),
    yield select(getSort),
    yield select(getOffset),
    yield select(getLimit)
  );
  yield put(displayHotels(fromJS(displayedHotels)));
}

export function* handleHotelSearchRequest({ search }) {
  let completed = false;
  while (!completed) {
    const response = yield call(api.searchHotels, search);
    yield call(updateDisplayedHotels, response.hotels);
    completed = response.completed;
  }
}

export function* watchHotelSearchRequest() {
  yield takeLatest(SEARCH_HOTELS, handleHotelSearchRequest);
}

export default [
  watchHotelSearchRequest,
];
