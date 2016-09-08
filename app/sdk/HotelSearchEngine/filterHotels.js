export const matchStarRatingFilter = (hotel, filter) => {
  const starRatings = filter.get('starRatings');
  return starRatings.isEmpty() || starRatings.getIn([Math.floor(hotel.star).toString(), 'selected']);
};

const filterHotels = (hotels, filter) => {  // eslint-disable-line arrow-body-style
  return hotels.filter(hotel => matchStarRatingFilter(hotel, filter));
};

export default filterHotels;
