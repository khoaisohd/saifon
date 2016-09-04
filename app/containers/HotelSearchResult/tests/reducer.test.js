import reducer from '../reducer';
import { fromJS } from 'immutable';
import {
  toggleStarRatingFilter,
  displayHotels,
  sortHotels,
  searchHotels,
  filterHotels,
} from '../actions';

describe('HotelSearchResult/reducer', () => {
  let state;
  let newState;

  beforeEach(() => {
    state = reducer(undefined, {});
  });

  describe('#initialState', () => {
    describe('sort', () => {
      it('sorts by lowest price', () => {
        expect(state.getIn(['sort', 'column'])).to.equal('PRICE');
        expect(state.getIn(['sort', 'order'])).to.equal('ASC');
      });
    });

    describe('loading', () => {
      it('is true', () => {
        expect(state.get('loading')).to.equal(true);
      });
    });
  });

  describe('#toggleStarRatingFilter', () => {
    it('updates star rating filter to true when current star rating is false', () => {
      newState = reducer(state, toggleStarRatingFilter('ST'));
      expect(newState.getIn(['filters', 'starRatings', 'ST'])).to.equal(true);
    });

    it('updates star rating filter to false when current star rating is true', () => {
      newState = reducer(state, toggleStarRatingFilter('ST'));
      newState = reducer(newState, toggleStarRatingFilter('ST'));
      expect(newState.getIn(['filters', 'starRatings', 'ST'])).to.equal(false);
    });
  });

  describe('#displayHotels', () => {
    it('updates displayed hotels', () => {
      const addedHotels = fromJS([{ id: 'x' }, { id: 'y' }]);
      newState = reducer(state, displayHotels(addedHotels));
      expect(newState.getIn(['displayedHotels']).toJS()).to.deep.equal(addedHotels.toJS());
    });

    it('sets loading to false', () => {
      newState = reducer(state, displayHotels([]));
      expect(newState.get('loading')).to.equal(false);
    });
  });

  describe('#sortHotels', () => {
    it('updates sort', () => {
      newState = reducer(state, sortHotels(fromJS({
        column: 'STAR',
        order: 'DESC',
      })));
      expect(newState.getIn(['sort', 'column'])).to.equal('STAR');
      expect(newState.getIn(['sort', 'order'])).to.equal('DESC');
    });
  });

  describe('#searchHotels', () => {
    it('resets state into initial state', () => {
      newState = reducer(state, searchHotels());
      expect(newState.toJS()).to.deep.equal(state.toJS());
    });
  });

  describe('#filterHotels', () => {
    it('sets loading to true', () => {
      newState = reducer(state, displayHotels([]));
      newState = reducer(newState, filterHotels());
      expect(newState.get('loading')).to.equal(true);
    });
  });
});
