import reducer from '../reducer';
import { fromJS } from 'immutable';
import {
  filterByStar,
  displayHotels,
} from '../actions';

describe('HotelSearchResult/reducer', () => {
  let state;
  let newState;

  beforeEach(() => {
    state = reducer(undefined, {});
  });

  describe('filterByStar', () => {
    it('adds the star type into filters', () => {
      newState = reducer(state, filterByStar('ST', true));
      expect(newState.getIn(['filters', 'stars', 'ST'])).to.equal(true);
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
