import { call, put, select, take } from 'redux-saga/effects';
import { takeLatest, delay } from 'redux-saga';
import { fromJS } from 'immutable';
import { SEARCH_HOTELS, FILTER_HOTELS } from './constants';
import { displayHotels } from './actions';
import { getHotelSearchEngine } from 'sdk/HotelSearchEngine';
import { getFilters, getSort, getOffset, getLimit } from './selectors';

export function* updateDisplayedHotels() {
  const engine = getHotelSearchEngine();
  const displayedHotels = yield call(engine.getDisplayedHotels.bind(engine),
    yield select(getFilters),
    yield select(getSort),
    yield select(getOffset),
    yield select(getLimit)
  );
  yield put(displayHotels(fromJS(displayedHotels)));
}

export function* handleHotelSearchRequest({ search }) {
  let completed = false;
  const engine = getHotelSearchEngine();
  engine.setSearch(search);
  while (!completed) {
    const response = yield call(engine.poll.bind(engine));
    yield call(updateDisplayedHotels);
    completed = response.completed;
  }
}

export function* watchHotelSearchRequest() {
  yield takeLatest(SEARCH_HOTELS, handleHotelSearchRequest);
}

export function* watchFilterHotel() {
  while (yield take(FILTER_HOTELS)) {
    yield call(delay, 100);
    yield call(updateDisplayedHotels);
  }
}

export default [
  watchHotelSearchRequest,
  watchFilterHotel,
];
