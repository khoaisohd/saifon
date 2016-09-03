import {
  SUBMIT_LOCATION,
  SUBMIT_TIMING,
  SUBMIT_TRAVELLERS,
  UPDATE_ROOMS_COUNT,
  UPDATE_GUESTS_COUNT,
} from './constants';

export const submitLocation = location => ({
  type: SUBMIT_LOCATION,
  location,
});

export const submitTiming = (checkIn, checkOut) => ({
  type: SUBMIT_TIMING,
  checkIn,
  checkOut,
});

export const submitTravellers = (roomsCount, guestsCount) => ({
  type: SUBMIT_TRAVELLERS,
  roomsCount,
  guestsCount,
});

export const updateRoomsCount = roomsCount => ({
  type: UPDATE_ROOMS_COUNT,
  roomsCount,
});

export const updateGuestsCount = guestsCount => ({
  type: UPDATE_GUESTS_COUNT,
  guestsCount,
});
