import {
  SUBMIT_LOCATION,
} from './constants';

import { fromJS } from 'immutable';

const initialState = fromJS({
  location: {},
});

function hotelsSearchesFormReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_LOCATION:
      return state
        .set('location', action.location);
    default:
      return state;
  }
}

export default hotelsSearchesFormReducer;