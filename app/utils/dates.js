import moment from 'moment';

export const DATE_FORMAT = 'DD-MM-YYYY';

export const getLaterDate = (d1, d2, format = DATE_FORMAT) => {
  const m1 = moment(d1, format);
  const m2 = moment(d2, format);
  return m1.isAfter(m2) ? d1 : d2;
};
