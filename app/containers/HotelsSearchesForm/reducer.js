import {
  SUBMIT_LOCATION_CODE,
} from './constants';

import { fromJS } from 'immutable';

const initialState = fromJS({
  search: {},
});

function hotelsSearchesFormReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_LOCATION_CODE:
      return state
        .setIn(['search', 'locationCode'], action.locationCode);
    default:
      return state;
  }
}

export default hotelsSearchesFormReducer;