import { getLaterDate } from 'helpers/dateHelper';

describe('helpers/dateHelper', () => {
  describe('getLaterDate', () => {
    it('returns the later date', () => {
      expect(getLaterDate('04-11-2006', '15-12-3006', 'DD-MM-YYYY')).to.equal('15-12-3006');
    });
  });
});
