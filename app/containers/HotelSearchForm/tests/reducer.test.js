import reducer from '../reducer';

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
      expect(newState.getIn(['location', 'code'])).to.equal('locationCode');
      expect(newState.getIn(['location', 'name'])).to.equal('locationName');
    });
  });

  describe('submitTiming', () => {
    it('changes checkIn and checkOut', () => {
      newState = reducer(state, submitTiming('checkIn', 'checkOut'));
      expect(newState.get('checkIn')).to.equal('checkIn');
      expect(newState.get('checkOut')).to.equal('checkOut');
    });
  });

  describe('submitTravellers', () => {
    it('changes roomsCount and guestsCount', () => {
      newState = reducer(state, submitTravellers('roomsCount', 'guestsCount'));
      expect(newState.get('roomsCount')).to.equal('roomsCount');
      expect(newState.get('guestsCount')).to.equal('guestsCount');
    });
  });
});
