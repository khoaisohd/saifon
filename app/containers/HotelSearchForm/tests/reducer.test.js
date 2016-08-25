import reducer from '../reducer';
import expect from 'expect';

import {
  submitLocation,
  submitTiming,
  submitTravellers,
} from '../actions';
import { fromJS } from 'immutable';

describe('HotelSearchForm/reducer', () => {
  let state;
  let newState;

  beforeEach(() => {
    state = reducer(undefined, {});
  });

  describe('submitLocation', () => {
    it('changes location', () => {
      newState = reducer(state, submitLocation(fromJS({
        code: 'locationCode',
        name: 'locationName',
      })));
      expect(newState.getIn(['location', 'code'])).toEqual('locationCode');
      expect(newState.getIn(['location', 'name'])).toEqual('locationName');
    });
  });

  describe('submitTiming', () => {
    it('changes checkIn and checkOut', () => {
      newState = reducer(state, submitTiming('checkIn', 'checkOut'));
      expect(newState.get('checkIn')).toEqual('checkIn');
      expect(newState.get('checkOut')).toEqual('checkOut');
    });
  });

  describe('submitTravellers', () => {
    it('changes roomsCount and guestsCount', () => {
      newState = reducer(state, submitTravellers('roomsCount', 'guestsCount'));
      expect(newState.get('roomsCount')).toEqual('roomsCount');
      expect(newState.get('guestsCount')).toEqual('guestsCount');
    });
  });
});
