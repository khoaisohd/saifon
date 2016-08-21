import {
  SUBMIT_LOCATION,
  SUBMIT_TIMING,
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