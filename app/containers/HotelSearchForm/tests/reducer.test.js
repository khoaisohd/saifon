import reducer from '../reducer';

import {
  submitLocation,
  submitTiming,
  submitTravellers,
  updateRoomsCount,
  updateGuestsCount,
} from '../actions';
import { fromJS } from 'immutable';

describe('HotelSearchForm/reducer', () => {
  let state;
  let newState;

  beforeEach(() => {
    state = reducer(undefined, {});
  });

  describe('submitLocation', () => {
    it('updates location', () => {
      newState = reducer(state, submitLocation(fromJS({
        code: 'locationCode',
        name: 'locationName',
      })));
      expect(newState.getIn(['location', 'code'])).to.equal('locationCode');
      expect(newState.getIn(['location', 'name'])).to.equal('locationName');
    });
  });

  describe('submitTiming', () => {
    it('updates checkIn and checkOut', () => {
      newState = reducer(state, submitTiming('checkIn', 'checkOut'));
      expect(newState.get('checkIn')).to.equal('checkIn');
      expect(newState.get('checkOut')).to.equal('checkOut');
    });
  });

  describe('submitTravellers', () => {
    it('updates roomsCount and guestsCount', () => {
      newState = reducer(state, submitTravellers('roomsCount', 'guestsCount'));
      expect(newState.get('roomsCount')).to.equal('roomsCount');
      expect(newState.get('guestsCount')).to.equal('guestsCount');
    });
  });

  describe('updateRoomsCount', () => {
    it('updates roomsCount', () => {
      newState = reducer(state, updateRoomsCount(2));
      expect(newState.get('roomsCount')).to.equal(2);
    });

    it('updates guestsCount when guestsCount is smaller than roomsCount', () => {
      state = fromJS({
        guestsCount: 2,
      });
      newState = reducer(state, updateRoomsCount(3));
      expect(newState.get('guestsCount')).to.equal(3);
    });

    it('updates guestsCount when guestsCount is larger than 4 times of roomsCount', () => {
      state = fromJS({
        guestsCount: 5,
      });
      newState = reducer(state, updateRoomsCount(1));
      expect(newState.get('guestsCount')).to.equal(4);
    });
  });

  describe('updateGuestsCount', () => {
    it('updates guestsCount', () => {
      newState = reducer(state, updateGuestsCount(2));
      expect(newState.get('guestsCount')).to.equal(2);
    });

    it('updates roomsCount when rooms count is greater than guestsCount', () => {
      state = fromJS({
        roomsCount: 2,
      });
      newState = reducer(state, updateGuestsCount(1));
      expect(newState.get('roomsCount')).to.equal(1);
    });
  });
});
