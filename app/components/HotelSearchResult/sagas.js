import { call, put, select, take, actionChannel } from 'redux-saga/effects';
import { takeLatest, delay, buffers } from 'redux-saga';
import { fromJS } from 'immutable';
import { FETCH_HOTELS, FIND_HOTELS, TOGGLE_STAR_RATING_FILTER, SORT_HOTELS, FILTER_BY_PRICE } from './constants';
import { findHotels, updateFilter, displayResult } from './actions';
import HotelSearchEngine from 'sdk/HotelSearchEngine';
import { getFilter, getSort } from './selectors';

const hotelSearchEngine = new HotelSearchEngine();

export function* handleFindHotelsRequest() {
  const filter = yield select(getFilter);
  const sort = yield select(getSort);
  const hotels = yield call(hotelSearchEngine.findHotels.bind(hotelSearchEngine), filter, sort);
  yield put(displayResult(hotels));
}

export function* handleFetchHotelsRequest({ search }) {
  let completed = false;
  hotelSearchEngine.setSearch(search);
  while (!completed) {
    const response = yield call(hotelSearchEngine.poll.bind(hotelSearchEngine));
    yield put(findHotels());
    yield put(updateFilter(fromJS(response.filter)));
    completed = response.completed;
  }
}

export function* watchFindHotelsRequest() {
  const requestChan = yield actionChannel(FIND_HOTELS, buffers.sliding(1));
  while (yield take(requestChan)) {
    yield call(delay, 100);
    yield call(handleFindHotelsRequest);
  }
}

export function* watchFetchHotelsRequest() {
  yield takeLatest(FETCH_HOTELS, handleFetchHotelsRequest);
}

export function* watchActionsThatTriggerFindHotels() {
  while (yield take([TOGGLE_STAR_RATING_FILTER, SORT_HOTELS, FILTER_BY_PRICE])) {
    yield put(findHotels());
  }
}

export default [
  watchFetchHotelsRequest,
  watchFindHotelsRequest,
  watchActionsThatTriggerFindHotels,
];
