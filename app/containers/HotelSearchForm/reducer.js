import {
  SUBMIT_LOCATION,
  SUBMIT_TIMING,
  SUBMIT_TRAVELLERS,
} from './constants';

import { fromJS } from 'immutable';

const initialState = fromJS({
  location: {},
  checkIn: null,
  checkOut: null,
  roomsCount: null,
  guestsCount: null,
});

function hotelSearchFormReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_LOCATION:
      return state
        .set('location', action.location);
    case SUBMIT_TIMING:
      return state
        .set('checkIn', action.checkIn)
        .set('checkOut', action.checkOut);
    case SUBMIT_TRAVELLERS:
      return state
        .set('roomsCount', action.roomsCount)
        .set('guestsCount', action.guestsCount);
    default:
      return state;
  }
};

export default hotelSearchFormReducer;