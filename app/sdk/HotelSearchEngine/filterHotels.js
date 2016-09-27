const alwaysTrue = () => true;

export const filterHotelByStarRating = filter => {
  const stars = filter.get('stars').toJS();
  if ([1, 2, 3, 4, 5].every(id => stars[id] && stars[id].selected)) return alwaysTrue;
  return hotel => stars[hotel.star].selected;
};

export const filterHotelByMinPrice = filter => {
  const minPrice = filter.getIn(['minPrice', 'value']);
  if (minPrice === 0) return alwaysTrue;
  return hotel => hotel.cheapestRate.price.amount > minPrice;
};

export const filterHotelByMaxPrice = filter => {
  const maxPrice = filter.getIn(['maxPrice', 'value']);
  if (maxPrice === 10000) return alwaysTrue;
  return hotel => hotel.cheapestRate.price.amount < maxPrice;
};

const filterHotels = (hotels, filter) => {  // eslint-disable-line arrow-body-style
  const filterByStarRating = filterHotelByStarRating(filter);
  const filterByMinPrice = filterHotelByMinPrice(filter);
  const filterByMaxPrice = filterHotelByMaxPrice(filter);

  if (filterByStarRating === alwaysTrue && filterByMinPrice === alwaysTrue && filterByMaxPrice === alwaysTrue) {
    return hotels;
  }

  return hotels.filter(hotel =>
    filterByStarRating(hotel) &&
    filterByMinPrice(hotel) &&
    filterByMaxPrice(hotel)
  );
};

export default filterHotels;
