# Asynchronous

Redux Sagas is awesome  
Check out the [Official documentation](http://yelouafi.github.io/redux-saga/index.html) for more information  

## Polling

We use `while loop` to represent our logic, stop when server notify completed

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

`takeLatest` cancel the current `handleFetchHotelsRequest` task and start a new `handleFetchHotelsRequest` task.

```JS
yield takeLatest(FETCH_HOTELS, handleFetchHotelsRequest);
```

## findHotels task buffer

`findHotels` task is trigger whenever user update filter, sort or server return new hotels ...

```JS
while (yield take([TOGGLE_STAR_RATING_FILTER, LOAD_MORE, SORT_HOTELS, FILTER_BY_PRICE])) {
  yield put(findHotels());
}
```

Let's talk about the worse scenario
```
Filter and sort few millions hotels on a slow phone

findHotels can take few seconds

User keep changing filter that spawn a lot of `findHotels` tasks
 
=> After user finish selecting filter, there're 10 pending findHotels tasks
```
  
Why do we need to run 10 `hotels` task that get the same `sort` and `filter` from store and return the same result  
  
We use `actionChannel` to solve our problem, we buffer `findHotels` tasks into an action channel which has maximum length of 1

```JS
export function* watchFindHotelsRequest() {
  const requestChan = yield actionChannel(FIND_HOTELS, buffers.sliding(1));
  while (yield take(requestChan)) {
    yield call(delay, 100);
    yield call(handleFindHotelsRequest);
  }
}
```
