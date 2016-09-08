export const filterByStarRating = (hotel, filter) => {
  const stars = filter.get('stars');
  return stars.isEmpty() || stars.getIn([Math.floor(hotel.star).toString(), 'selected']);
};

export const filterByMinPrice = (hotel, filter) => {
  const minPrice = filter.getIn(['minPrice', 'value']);
  const hotelPrice = hotel.cheapestRate.price.amount;
  return hotelPrice > minPrice;
};

export const filterByMaxPrice = (hotel, filter) => {
  const maxPrice = filter.getIn(['maxPrice', 'value']);
  const hotelPrice = hotel.cheapestRate.price.amount;
  return hotelPrice < maxPrice;
};

const filterHotels = (hotels, filter) => {  // eslint-disable-line arrow-body-style
  return hotels.filter(hotel =>
    filterByStarRating(hotel, filter) &&
    filterByMinPrice(hotel, filter) &&
    filterByMaxPrice(hotel, filter)
  );
};

export default filterHotels;
