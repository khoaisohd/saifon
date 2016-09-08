import { filterByStarRating, filterByMinPrice } from '../filterHotels';
import { fromJS } from 'immutable';

describe('filterHotels', () => {
  describe('#filterByStarRating', () => {
    it('returns true for hotel that has matched star', () => {
      const hotel = { star: 2 };
      const filter = fromJS({
        stars: {
          2: {
            selected: true,
          },
        },
      });
      expect(filterByStarRating(hotel, filter)).to.equal(true);
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
      expect(filterByStarRating(hotel, filter)).to.equal(false);
    });
  });

  describe('#filterByMinPrice', () => {
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
      expect(filterByMinPrice(hotel, filter)).to.equal(true);
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
        minPrice: {
          value: 120,
        },
      });
      expect(filterByMinPrice(hotel, filter)).to.equal(false);
    });
  });
});
