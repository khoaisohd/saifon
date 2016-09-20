import { fromJS } from 'immutable';

const initialState = fromJS({
  currencyCode: 'SGD',
  locale: 'en',
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default appReducer;
