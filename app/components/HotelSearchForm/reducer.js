import moment from 'moment';
import { DATE_FORMAT, getLaterDate } from 'helpers/dates';

import {
  UPDATE_LOCATION,
  UPDATE_ROOMS_COUNT,
  UPDATE_GUESTS_COUNT,
  UPDATE_CHECK_IN,
  UPDATE_CHECK_OUT,
} from './constants';

import { fromJS } from 'immutable';

const initialState = () => fromJS({
  location: {
    code: 'SG',
    name: 'Singapore',
  },
  checkIn: moment().format(DATE_FORMAT),
  checkOut: moment().add(3, 'day').format(DATE_FORMAT),
  roomsCount: 1,
  guestsCount: 2,
  checkOutSelected: false,
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

function hotelSearchFormReducer(state = initialState(), action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      return state
        .set('location', action.location);
    case UPDATE_CHECK_IN:
      return state
        .set('checkIn', action.checkIn)
        .set('checkOut', getLaterDate(state.get('checkOut'), action.checkIn));
    case UPDATE_CHECK_OUT:
      return state
        .set('checkOut', action.checkOut)
        .set('checkOutSelected', true);
    case UPDATE_ROOMS_COUNT:
      return state
        .set('roomsCount', action.roomsCount)
        .set('guestsCount', correctGuestsCount(state.get('guestsCount'), action.roomsCount));
    case UPDATE_GUESTS_COUNT:
      return state
        .set('guestsCount', action.guestsCount)
        .set('roomsCount', Math.min(state.get('roomsCount'), action.guestsCount));
    default:
      return state;
  }
}

export default hotelSearchFormReducer;
