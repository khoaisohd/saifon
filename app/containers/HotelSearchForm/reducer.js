import {
  SUBMIT_LOCATION,
  SUBMIT_TIMING,
  SUBMIT_TRAVELLERS,
  UPDATE_ROOMS_COUNT,
  UPDATE_GUESTS_COUNT,
} from './constants';

import { fromJS } from 'immutable';

const initialState = fromJS({
  location: {},
  checkIn: null,
  checkOut: null,
  roomsCount: null,
  guestsCount: null,
});

const correctGuestsCount = (guestsCount, roomsCount) => {
  if (guestsCount < roomsCount) {
    return roomsCount;
  }
  if (guestsCount > roomsCount * 4) {
    return roomsCount * 4;
  }
  return guestsCount;
};

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
    case UPDATE_ROOMS_COUNT:
      return state
        .set('roomsCount', action.roomsCount)
        .set('guestsCount', correctGuestsCount(state.get('guestsCount'), action.roomsCount));
    case UPDATE_GUESTS_COUNT:
      return state
        .set('guestsCount', action.guestsCount)
        .set('roomsCount', Math.min(action.guestsCount, state.get('roomsCount')));
    default:
      return state;
  }
}

export default hotelSearchFormReducer;
