import {
  SUBMIT_LOCATION,
} from './constants';

export const submitLocation = location => ({
  type: SUBMIT_LOCATION,
  location,
});