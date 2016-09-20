import reducer from 'components/HotelSearchResult/reducer';
import store from 'components/HotelSearchResult/store';
import { fromJS } from 'immutable';
import {
  sortHotels,
  fetchHotels,
  toggleStarRatingFilter,
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
      newState = reducer(state, fetchHotels());
      expect(newState.toJS()).to.deep.equal(state.toJS());
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
  });

  describe('#displayResult', () => {
    it('updates result', () => {
      const hotels = fromJS([{ id: 1 }]);
      newState = reducer(state, displayResult(hotels));
      expect(store.getDisplayedHotels()).to.deep.equal(hotels);
      expect(newState.get('hasNoResult')).to.equal(false);
    });
  });
});
