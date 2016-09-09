
const getCheapestAmount = (hotel) => hotel.cheapestRate.price.amount;

const getReviewScore = (hotel) => parseInt(hotel.reviewScore);

const getStarRating = (hotel) => Math.round(hotel.star);

const propertyGetter = (property) => {
  switch (property) {
    case 'PRICE':
      return getCheapestAmount;
    case 'REVIEWS':
      return getReviewScore;
    case 'STAR':
      return getStarRating;
    default:
      return getCheapestAmount;
  }
};

const sortBy = (sortData) => {
  const getSortValue = propertyGetter(sortData.get('property'));
  return (hotelA, hotelB) => {
    const valA = getSortValue(hotelA);
    const valB = getSortValue(hotelB);
    if (valA === valB) return 0;
    if (valA === null || valA === undefined) return 1;
    if (valB === null || valB === undefined) return -1;
    return (valA > valB) === (sortData.get('order') === 'ASC') ? 1 : -1;
  };
};

const sortHotels = (hotels, sortData) => {
  const sorter = sortBy(sortData);
  return hotels.sort(sorter);
};

export default sortHotels;
