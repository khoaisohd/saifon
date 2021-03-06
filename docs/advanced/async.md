# Asynchronous

Redux Sagas is awesome  
Check out the [Official documentation](http://yelouafi.github.io/redux-saga/index.html) for more information  

## Polling

We use `while loop` to do polling, stop when server notify completed

```JS
export function* handleFetchHotelsRequest({ search }) {
  let completed = false;
  hotelSearchEngine.setSearch(search);
  while (!completed) {
    const response = yield call(engine.poll.bind(engine));
    ...
    completed = response.completed;
  }
}
```

We use `takeLatest` to cancel the current polling task and start a new polling

```JS
yield takeLatest(FETCH_HOTELS, handleFetchHotelsRequest);
```

## Buffering findHotels tasks

`findHotels` is triggered whenever users update filter, sort or server returns new hotels ...

```JS
while (yield take([TOGGLE_STAR_RATING_FILTER, LOAD_MORE, SORT_HOTELS, FILTER_BY_PRICE])) {
  yield put(findHotels());
}
```

Worse scenario

```
Finding Hotels from few millions hotels on a slow phone can takes few seconds

Changing filter frequently creates a lot of `findHotels` tasks
 
After selecting filter, there're 10 pending findHotels tasks

Do we need to execute 10 findHotels tasks that get the same sort and filter and return the same result?
```
  
By using `actionChannel`, we buffer `findHotels` into a channel and keep its length <= 1, in the other words, 
we only execute the last `findHotels` task and drop the rest 

```JS
export function* watchFindHotelsRequest() {
  const requestChan = yield actionChannel(FIND_HOTELS, buffers.sliding(1));
  while (yield take(requestChan)) {
    yield call(delay, 100);
    yield call(handleFindHotelsRequest);
  }
}
```
