import {
  getDisplayedHotels,
  getFilters,
  getSort,
  getOffset,
  getLimit,
} from '../selectors';
import { fromJS } from 'immutable';

describe('HotelSearchResult/selectors', () => {
  describe('#getDisplayedHotels', () => {
    it('gets displayed hotels', () => {
      const hotels = [
        { id: 1 },
        { id: 2 },
      ];
      const state = fromJS({
        HotelSearchResult: { displayedHotels: hotels },
      });
      expect(getDisplayedHotels(state).toJS()).to.deep.equal(hotels);
    });
  });

  describe('#getFilters', () => {
    it('gets filter', () => {
      const filter = { xxx: 'xxx' };
      const state = fromJS({
        HotelSearchResult: { filter },
      });
      expect(getFilters(state).toJS()).to.deep.equal(filter);
    });
  });

  describe('#getSort', () => {
    it('gets sort', () => {
      const sort = { xxx: 'xxx' };
      const state = fromJS({
        HotelSearchResult: { sort },
      });
      expect(getSort(state).toJS()).to.deep.equal(sort);
    });
  });

  describe('#getOffset', () => {
    it('gets offset', () => {
      const state = fromJS({
        HotelSearchResult: { offset: 1 },
      });
      expect(getOffset(state)).to.deep.equal(1);
    });
  });

  describe('#getLimit', () => {
    it('gets limit', () => {
      const state = fromJS({
        HotelSearchResult: { limit: 20 },
      });
      expect(getLimit(state)).to.deep.equal(20);
    });
  });
});
