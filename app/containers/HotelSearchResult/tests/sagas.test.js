import { handleHotelSearchRequest, updateDisplayedHotels } from '../sagas.js';
import api from 'api';
import { call } from 'redux-saga/effects';
import { searchHotels } from '../actions';

describe('HotelSearchResult/sagas', () => {
  describe('#handleHotelSearchRequest', () => {
    let generator;
    const search = {};

    beforeEach(() => {
      generator = handleHotelSearchRequest(searchHotels(search));
    });

    it('calls hotel search api', () => {
      const descriptor = generator.next().value;
      expect(descriptor).to.deep.equal(call(api.searchHotels, search));
    });

    it('puts displayed hotel to store', () => {
      generator.next();
      const hotels = [{ id: 1 }];
      const descriptor = generator.next({ hotels }).value;
      expect(descriptor).to.deep.equal(call(updateDisplayedHotels, hotels));
    });

    it('continues polling if not completed', () => {
      generator.next();
      generator.next({ completed: false });
      const descriptor = generator.next().value;
      expect(descriptor).to.deep.equal(call(api.searchHotels, search));
    });

    it('stops polling if completed', () => {
      generator.next();
      generator.next({ completed: true });
      expect(generator.next().done).to.equal(true);
    });
  });
});
