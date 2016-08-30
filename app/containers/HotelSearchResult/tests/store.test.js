import Store from '../Store';

describe('HotelSearchResult/store', () => {
  let store;
  beforeEach(() => {
    store = new Store();
  });

  describe('#getDisplayedHotels', () => {
    it('slices store hotels', () => {
      const hotels = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ];
      store.updateHotels(hotels);
      const displayedHotels = store.getDisplayedHotels({}, {}, 0, 2);
      expect(displayedHotels).to.deep.equal([
        { id: 1 },
        { id: 2 },
      ]);
    });
  });
});
