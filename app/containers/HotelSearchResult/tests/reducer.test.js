import reducer from '../reducer';
import { fromJS } from 'immutable';
import {
  filterByStarRatings,
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
    it('updates star rating filters when filterByStarRatings is dispatched', () => {
      const starRatings = fromJS([5]);
      newState = reducer(state, filterByStarRatings(starRatings));
      expect(newState.getIn(['filters', 'starRatings'])).to.equal(starRatings);
    });

    it('clears star ratings filter when sent with empty list', () => {
      const starRatings = fromJS([]);
      newState = reducer(state, filterByStarRatings(starRatings));
      expect(newState.getIn(['filters', 'starRatings'])).to.equal(starRatings);
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
