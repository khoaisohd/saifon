# Asynchronous

Redux Sagas is awesome  
Check out the [Official documentation](http://yelouafi.github.io/redux-saga/index.html) for more information  

## Polling

```JS
export function* handleFetchHotelsRequest({ search }) {
  let completed = false;
  hotelSearchEngine.setSearch(search);
  while (!completed) {
    const response = yield call(engine.poll.bind(engine));
    yield put(findHotels());
    yield put(updateFilter(fromJS(response.filter)));
    completed = response.completed;
  }
}
```

## Cancel current polling task
```JS
yield takeLatest(FETCH_HOTELS, handleFetchHotelsRequest);
```

## FindHotels Task channel
```JS
export function* watchFindHotelsRequest() {
  const requestChan = yield actionChannel(FIND_HOTELS, buffers.sliding(1));
  while (yield take(requestChan)) {
    yield call(delay, 100);
    yield call(handleFindHotelsRequest);
  }
}
```