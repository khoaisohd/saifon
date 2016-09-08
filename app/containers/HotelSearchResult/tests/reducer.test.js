import reducer from '../reducer';
import { fromJS } from 'immutable';
import {
  sortHotels,
  fetchHotels,
  toggleStarRatingFilter,
  loadMore,
  displayHotels,
  updateFilters,
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
    it('updates star rating filter', () => {
      newState = reducer(state, toggleStarRatingFilter('5'));
      expect(newState.getIn(['filter', 'starRatings', '5', 'selected'])).to.equal(false);
    });

    it('resets limit to 20', () => {
      state = reducer(fromJS({ limit: 50 }), toggleStarRatingFilter('5'));
      expect(state.get('limit')).to.equal(20);
    });
  });

  describe('#displayHotels', () => {
    it('updates displayed hotels', () => {
      const addedHotels = fromJS([{ id: 'x' }, { id: 'y' }]);
      newState = reducer(state, displayHotels(addedHotels));
      expect(newState.get('displayedHotels').toJS()).to.deep.equal(addedHotels.toJS());
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

    it('resets limit to 20', () => {
      state = reducer(fromJS({ limit: 50 }), toggleStarRatingFilter('5'));
      expect(state.get('limit')).to.equal(20);
    });
  });

  describe('#searchHotels', () => {
    it('resets state into initial state', () => {
      newState = reducer(state, fetchHotels());
      expect(newState.toJS()).to.deep.equal(state.toJS());
    });
  });

  describe('#loadMore', () => {
    it('increases limit', () => {
      state = reducer(fromJS({ limit: 10 }), loadMore());
      expect(state.get('limit')).to.equal(30);
    });
  });

  describe('#updateFilters', () => {
    it('deeply updates filters', () => {
      const filter = fromJS({
        minPrice: {
          threshold: 1000,
        },
      });

      const state = fromJS({
        filter: {
          minPrice: {
            value: 1500,
          },
        },
      });
      newState = reducer(state, updateFilters(filter));

      expect(newState.getIn(['filter', 'minPrice', 'threshold'])).to.equal(1000);
      expect(newState.getIn(['filter', 'minPrice', 'value'])).to.equal(1500);
    });
  });
});
