import HotelSearchEngine from '../HotelSearchEngine';

describe('HotelSearchEngine', () => {
  let engine;
  beforeEach(() => {
    engine = new HotelSearchEngine();
  });

  describe('#getDisplayedHotels', () => {
    it('slices engine hotels', () => {
      const hotels = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ];
      engine.setHotels(hotels);
      const displayedHotels = engine.getDisplayedHotels({}, {}, 0, 2);
      expect(displayedHotels).to.deep.equal([
        { id: 1 },
        { id: 2 },
      ]);
    });
  });
});
