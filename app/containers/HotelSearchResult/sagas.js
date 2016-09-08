import { call, put, select, take, actionChannel } from 'redux-saga/effects';
import { takeLatest, delay, buffers } from 'redux-saga';
import { fromJS } from 'immutable';
import { FETCH_HOTELS, FIND_HOTELS, TOGGLE_STAR_RATING_FILTER, LOAD_MORE } from './constants';
import { displayHotels, findHotels } from './actions';
import { getHotelSearchEngine } from 'sdk/HotelSearchEngine';
import { getFilter, getSort, getOffset, getLimit } from './selectors';

export function* handleFindHotelsRequest() {
  const engine = getHotelSearchEngine();
  const hotels = yield call(engine.findHotels.bind(engine),
    yield select(getFilter),
    yield select(getSort),
    yield select(getOffset),
    yield select(getLimit)
  );
  yield put(displayHotels(fromJS(hotels)));
}

export function* handleFetchHotelsRequest({ search }) {
  let completed = false;
  const engine = getHotelSearchEngine();
  engine.setSearch(search);
  while (!completed) {
    const response = yield call(engine.poll.bind(engine));
    yield put(findHotels());
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
  while (yield take([TOGGLE_STAR_RATING_FILTER, LOAD_MORE])) {
    yield put(findHotels());
  }
}

export default [
  watchFetchHotelsRequest,
  watchFindHotelsRequest,
  watchActionsThatTriggerFindHotels,
];
