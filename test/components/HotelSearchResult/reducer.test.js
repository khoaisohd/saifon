import reducer from 'components/HotelSearchResult/reducer';
import { fromJS } from 'immutable';
import {
  sortHotels,
  fetchHotels,
  toggleStarRatingFilter,
  loadMore,
  updateFilter,
  filterByPrice,
  displayResult,
} from 'components/HotelSearchResult/actions';

describe('HotelSearchResult/reducer', () => {
  let state;
  let newState;

  beforeEach(() => {
    state = reducer(undefined, {});
  });

  describe('#initialState', () => {
    describe('sort', () => {
      it('sorts by lowest price', () => {
        expect(state.getIn(['sort', 'property'])).to.equal('PRICE');
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
      expect(newState.getIn(['filter', 'stars', '5', 'selected'])).to.equal(false);
    });

    it('resets limit to 20', () => {
      state = reducer(fromJS({ limit: 50 }), toggleStarRatingFilter('5'));
      expect(state.get('limit')).to.equal(20);
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

  describe('#updateFilter', () => {
    it('deeply updates filter', () => {
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
      newState = reducer(state, updateFilter(filter));

      expect(newState.getIn(['filter', 'minPrice', 'threshold'])).to.equal(1000);
      expect(newState.getIn(['filter', 'minPrice', 'value'])).to.equal(1500);
    });
  });

  describe('#filterByPrice', () => {
    it('updates min price value and max price value', () => {
      newState = reducer(state, filterByPrice(100, 1000));
      expect(newState.getIn(['filter', 'minPrice', 'value'])).to.equal(100);
      expect(newState.getIn(['filter', 'maxPrice', 'value'])).to.equal(1000);
    });

    it('resets limit to 20', () => {
      state = reducer(fromJS({ limit: 50 }), filterByPrice(100, 1000));
      expect(state.get('limit')).to.equal(20);
    });
  });

  describe('#displayResult', () => {
    it('updates result', () => {
      newState = reducer(state, displayResult([{ id: 1 }], true, false));
      expect(newState.get('displayedHotels')).to.deep.equal([{ id: 1 }]);
      expect(newState.get('hasNoResult')).to.equal(true);
      expect(newState.get('canLoadMore')).to.equal(false);
    });
  });
});
