import { call, put, select, take, actionChannel } from 'redux-saga/effects';
import { takeLatest, delay, buffers } from 'redux-saga';
import { fromJS } from 'immutable';
import { FETCH_HOTELS, FIND_HOTELS, TOGGLE_STAR_RATING_FILTER, SORT_HOTELS, LOAD_MORE, FILTER_BY_PRICE } from './constants';
import { findHotels, updateFilter, displayResult } from './actions';
import { getHotelSearchEngine } from 'sdk/HotelSearchEngine';
import { getFilter, getSort, getOffset, getLimit } from './selectors';

export function* handleFindHotelsRequest() {
  const engine = getHotelSearchEngine();
  const filter = yield select(getFilter);
  const sort = yield select(getSort);
  const offset = yield select(getOffset);
  const limit = yield select(getLimit);

  const hotels = yield call(engine.findHotels.bind(engine), filter, sort);
  yield put(displayResult(
    fromJS(hotels.slice(offset, limit)),
    hotels.length === 0,
    hotels.length > limit
  ));
}

export function* handleFetchHotelsRequest({ search }) {
  let completed = false;
  const engine = getHotelSearchEngine();
  engine.setSearch(search);
  while (!completed) {
    const response = yield call(engine.poll.bind(engine));
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
  while (yield take([TOGGLE_STAR_RATING_FILTER, LOAD_MORE, SORT_HOTELS, FILTER_BY_PRICE])) {
    yield put(findHotels());
  }
}

export default [
  watchFetchHotelsRequest,
  watchFindHotelsRequest,
  watchActionsThatTriggerFindHotels,
];
