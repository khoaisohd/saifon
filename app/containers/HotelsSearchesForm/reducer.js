import {
  SUBMIT_LOCATION,
  SUBMIT_TIMING,
} from './constants';

import { fromJS } from 'immutable';

const initialState = fromJS({
  location: {},
  checkIn: null,
  checkOut: null,
});

function hotelsSearchesFormReducer(state = initialState, action) {
  switch (action.type) {
  case SUBMIT_LOCATION:
    return state
      .set('location', action.location);
  case SUBMIT_TIMING:
    return state
      .set('checkIn', action.checkIn)
      .set('checkOut', action.checkOut);
    return state;
  default:
    return state;
  }
}

export default hotelsSearchesFormReducer;