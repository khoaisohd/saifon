import { matchStarRatingFilter } from '../filterHotels';
import { fromJS } from 'immutable';

describe('filterHotels', () => {
  describe('#matchStarRatingFilter', () => {
    it('returns true for hotel that has matched star', () => {
      const hotel = { star: 2 };
      const filter = fromJS({
        starRatings: {
          2: {
            selected: true,
          },
        },
      });
      expect(matchStarRatingFilter(hotel, filter)).to.equal(true);
    });

    it('returns false for hotel that does not have matched star', () => {
      const hotel = { star: 2 };
      const filter = fromJS({
        starRatings: {
          2: {
            selected: false,
          },
        },
      });
      expect(matchStarRatingFilter(hotel, filter)).to.equal(false);
    });
  });
});
