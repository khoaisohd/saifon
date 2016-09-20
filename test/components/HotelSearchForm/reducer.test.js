import reducer from 'components/HotelSearchForm/reducer';

import {
  updateLocation,
  updateCheckIn,
  updateCheckOut,
  updateRoomsCount,
  updateGuestsCount,
} from 'components/HotelSearchForm/actions';
import { fromJS } from 'immutable';

describe('HotelSearchForm/reducer', () => {
  let state;
  let newState;

  beforeEach(() => {
    state = reducer(undefined, {});
  });

  describe('updateLocation', () => {
    it('updates location', () => {
      newState = reducer(state, updateLocation(fromJS({
        code: 'locationCode',
        name: 'locationName',
      })));
      expect(newState.getIn(['location', 'code'])).to.equal('locationCode');
      expect(newState.getIn(['location', 'name'])).to.equal('locationName');
    });
  });

  describe('updateCheckIn', () => {
    it('updates check in', () => {
      newState = reducer(state, updateCheckIn('10-20-2010'));
      expect(newState.get('checkIn')).to.equal('10-20-2010');
    });

    it('updates check out if check in is later than check out', () => {
      newState = reducer(fromJS({ checkOut: '20-10-2010' }), updateCheckIn('24-10-2010'));
      expect(newState.get('checkOut')).to.equal('24-10-2010');
    });
  });

  describe('updateCheckOut', () => {
    it('updates check out', () => {
      newState = reducer(state, updateCheckOut('09-12-2011'));
      expect(newState.get('checkOut')).to.equal('09-12-2011');
    });

    it('updates checkOutSelected to true', () => {
      newState = reducer(state, updateCheckOut('09-12-2011'));
      expect(newState.get('checkOutSelected')).to.equal(true);
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
