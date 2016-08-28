import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { fromJS } from 'immutable';
import { SEARCH_HOTELS } from './constants';
import { displayHotels } from './actions';
import api from 'api';

export function* handleHotelSearchRequest({ search }) {
  let completed = false;
  while (!completed) {
    const response = yield call(api.searchHotels, search);
    yield put(displayHotels(fromJS(response.hotels)));
    completed = response.completed;
  }
}

export function* watchHotelSearchRequest() {
  yield takeLatest(SEARCH_HOTELS, handleHotelSearchRequest);
}

export default [
  watchHotelSearchRequest,
];
