import {
  SUBMIT_LOCATION,
  SUBMIT_TIMING,
  SUBMIT_TRAVELLERS,
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
