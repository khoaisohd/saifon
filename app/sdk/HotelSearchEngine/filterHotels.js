export const filterByStarRating = (hotel, filter) => {
  const stars = filter.get('stars');
  return stars.isEmpty() || stars.getIn([Math.floor(hotel.star).toString(), 'selected']);
};

const filterHotels = (hotels, filter) => {  // eslint-disable-line arrow-body-style
  return hotels.filter(hotel => filterByStarRating(hotel, filter));
};

export default filterHotels;
