import reducer from '../reducer';
import { fromJS } from 'immutable';
import {
  addFilterStarType,
  removeFilterStarType,
  displayHotels,
} from '../actions';

describe('HotelSearchResult/reducer', () => {
  let state;
  let newState;

  beforeEach(() => {
    state = reducer(undefined, {});
  });

  describe('addFilterStarType', () => {
    it('adds the star type into filters', () => {
      newState = reducer(state, addFilterStarType('ST'));
      expect(newState.getIn(['filters', 'starTypes', 'ST'])).to.equal(true);
    });
  });

  describe('removeFilterStarType', () => {
    it('removes the star type from filters', () => {
      newState = reducer(state, addFilterStarType('ST'));
      newState = reducer(newState, removeFilterStarType('ST'));
      expect(newState.getIn(['filters', 'starTypes', 'ST'])).to.equal(false);
    });
  });

  describe('displayHotels', () => {
    it('displays hotels', () => {
      const addedHotels = fromJS([{ id: 'x' }, { id: 'y' }]);
      newState = reducer(state, displayHotels(addedHotels));
      expect(newState.getIn(['displayedHotels']).toJS()).to.deep.equal(addedHotels.toJS());
    });
  });
});
