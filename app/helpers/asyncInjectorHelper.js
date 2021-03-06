import { conformsTo, isEmpty, isFunction, isObject, isString } from 'lodash';
import invariant from 'invariant';
import warning from 'warning';
import createReducer from 'reducers';

/**
 * Validate the shape of redux store
 */
export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject,
  };
  invariant(
    conformsTo(store, shape),
    '(app/helpers...) asyncInjectorHelper: Expected a valid redux store'
  );
}

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name) && isFunction(asyncReducer),
      '(app/helpers...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
    );

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store, isValid) {
  const sagasMap = {};
  return function injectSagas(name, sagas) {
    if (sagasMap[name]) {
      return;
    }
    sagasMap[name] = sagas;

    if (!isValid) checkStore(store);

    invariant(
      Array.isArray(sagas),
      '(app/helpers...) injectAsyncSagas: Expected `sagas` to be an array of generator functions'
    );

    warning(
      !isEmpty(sagas),
      '(app/helpers...) injectAsyncSagas: Received an empty `sagas` array'
    );

    sagas.map(store.runSaga);
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true),
  };
}
