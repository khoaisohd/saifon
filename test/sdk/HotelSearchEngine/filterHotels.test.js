import { filterHotelByStarRating, filterHotelByMinPrice, filterHotelByMaxPrice } from 'sdk/HotelSearchEngine/filterHotels';
import { fromJS } from 'immutable';

describe('filterHotels', () => {
  describe('#filterHotelByStarRating', () => {
    it('returns true for hotel that has matched star', () => {
      const hotel = { star: 2 };
      const filter = fromJS({
        stars: {
          2: {
            selected: true,
          },
        },
      });
      expect(filterHotelByStarRating(filter)(hotel)).to.equal(true);
    });

    it('returns false for hotel that does not have matched star', () => {
      const hotel = { star: 2 };
      const filter = fromJS({
        stars: {
          2: {
            selected: false,
          },
        },
      });
      expect(filterHotelByStarRating(filter)(hotel)).to.equal(false);
    });
  });

  describe('#filterHotelByMinPrice', () => {
    it('returns true for hotel that is more expensive than the filter value', () => {
      const hotel = {
        cheapestRate: {
          price: {
            amount: 100,
          },
        },
      };
      const filter = fromJS({
        minPrice: {
          value: 70,
        },
      });
      expect(filterHotelByMinPrice(filter)(hotel)).to.equal(true);
    });

    it('returns false for hotel that is cheaper than the filter value', () => {
      const hotel = {
        cheapestRate: {
          price: {
            amount: 100,
          },
        },
      };
      const filter = fromJS({
        minPrice: {
          value: 120,
        },
      });
      expect(filterHotelByMinPrice(filter)(hotel)).to.equal(false);
    });
  });

  describe('#filterHotelByMaxPrice', () => {
    it('returns false for hotel that is more expensive than the filter value', () => {
      const hotel = {
        cheapestRate: {
          price: {
            amount: 100,
          },
        },
      };
      const filter = fromJS({
        maxPrice: {
          value: 70,
        },
      });
      expect(filterHotelByMaxPrice(filter)(hotel)).to.equal(false);
    });

    it('returns true for hotel that is cheaper than the filter value', () => {
      const hotel = {
        cheapestRate: {
          price: {
            amount: 100,
          },
        },
      };
      const filter = fromJS({
        maxPrice: {
          value: 120,
        },
      });
      expect(filterHotelByMaxPrice(filter)(hotel)).to.equal(true);
    });
  });
});
