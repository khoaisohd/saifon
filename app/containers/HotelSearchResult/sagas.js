import { call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { fromJS } from 'immutable';
import { SEARCH_HOTELS } from './constants';
import { displayHotels } from './actions';
import { getHotelSearchEngine } from 'sdk/HotelSearchEngine';
import { getFilters, getSort, getOffset, getLimit } from './selectors';

export function* handleHotelSearchRequest({ search }) {
  let completed = false;
  const engine = getHotelSearchEngine();
  engine.setSearch(search);
  while (!completed) {
    const response = yield call(engine.poll.bind(engine));
    const displayedHotels = engine.getDisplayedHotels(
      yield select(getFilters),
      yield select(getSort),
      yield select(getOffset),
      yield select(getLimit)
    );
    yield put(displayHotels(fromJS(displayedHotels)));
    completed = response.completed;
  }
}

export function* watchHotelSearchRequest() {
  yield takeLatest(SEARCH_HOTELS, handleHotelSearchRequest);
}

export default [
  watchHotelSearchRequest,
];
