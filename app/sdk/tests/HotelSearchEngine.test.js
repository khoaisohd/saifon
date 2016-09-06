import { fromJS } from 'immutable';
import HotelSearchEngine from 'sdk/HotelSearchEngine';
import hotelsData from './hotels';

describe('HotelSearchEngine', () => {
  let engine;

  beforeEach(() => {
    engine = new HotelSearchEngine();
    engine.setHotels(hotelsData);
  });

  describe('#findHotels', () => {
    it('returns 20 hotels by default', () => {
      const displayHotelsPromise = engine.findHotels();
      return displayHotelsPromise.then((hotels) => {
        expect(hotels.length).to.be.eql(20);
      });
    });

    describe('filters', () => {
      it('filter by stars', () => {
        const filters = fromJS({ starRatings: { 5: { selected: true } } });
        const displayHotelsPromise = engine.findHotels(filters, null);
        return displayHotelsPromise.then((hotels) => {
          const allFiveStarHotels = hotels.every(hotel =>
            Math.round(hotel.star) === 5
          );
          expect(allFiveStarHotels).to.be.true; // eslint-disable-line
        });
      });
    });
  });
});
