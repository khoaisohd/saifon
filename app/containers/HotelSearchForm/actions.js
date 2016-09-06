import {
  UPDATE_LOCATION,
  UPDATE_ROOMS_COUNT,
  UPDATE_GUESTS_COUNT,
  UPDATE_CHECK_IN,
  UPDATE_CHECK_OUT,
} from './constants';

export const updateLocation = location => ({
  type: UPDATE_LOCATION,
  location,
});

export const updateCheckIn = checkIn => ({
  type: UPDATE_CHECK_IN,
  checkIn,
});

export const updateCheckOut = checkOut => ({
  type: UPDATE_CHECK_OUT,
  checkOut,
});

export const updateRoomsCount = roomsCount => ({
  type: UPDATE_ROOMS_COUNT,
  roomsCount,
});

export const updateGuestsCount = guestsCount => ({
  type: UPDATE_GUESTS_COUNT,
  guestsCount,
});
