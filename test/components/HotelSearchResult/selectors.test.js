import {
  getDisplayedHotels,
  getFilter,
  getSort,
  getOffset,
} from 'components/HotelSearchResult/selectors';
import store from 'components/HotelSearchResult/store';

import { fromJS } from 'immutable';

describe('HotelSearchResult/selectors', () => {
  describe('#getDisplayedHotels', () => {
    it('gets displayed hotels', () => {
      const hotels = [
        { id: 1 },
        { id: 2 },
      ];
      store.setDisplayedHotels(fromJS(hotels));
      expect(getDisplayedHotels().toJS()).to.deep.equal(hotels);
    });
  });

  describe('#getFilter', () => {
    it('gets filter', () => {
      const filter = { xxx: 'xxx' };
      const state = fromJS({
        HotelSearchResult: { filter },
      });
      expect(getFilter(state).toJS()).to.deep.equal(filter);
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
});
