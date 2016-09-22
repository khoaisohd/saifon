import moment from 'moment';
import getWeeks from 'components/shared/DatePicker/getWeeks';

const today = moment();
const weeks = getWeeks(today);

describe('getWeeks', () => {
  it('return an array of arrays', () => {
    expect(weeks).to.be.instanceof(Array);

    weeks.forEach((week) => {
      expect(week).to.be.instanceof(Array);
    });
  });

  it('first week contains first day of the month', () => {
    const firstWeek = weeks[0];
    const firstDayOfMonth = today.clone().startOf('month');
    const containsFirstday = firstWeek.some((day) => day.diff(firstDayOfMonth, 'days') === 0);
    expect(containsFirstday).to.be.equal(true);
  });

  it('last week contains last day of the month', () => {
    const lastWeek = weeks[weeks.length - 1];
    const lastDayOfMonth = today.clone().endOf('month');
    const constainsLastDat = lastWeek.some((day) => day.diff(lastDayOfMonth, 'days') === 0);
    expect(constainsLastDat).to.be.equal(true);
  });
});
