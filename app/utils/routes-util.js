export const pathToHotelSearch = routeParams => {
  const { locationCode, checkIn, checkOut, guestsCount, roomsCount } = routeParams;
  return `/hotels/${locationCode}/${checkIn}/${checkOut}/${guestsCount}/${roomsCount}`;
};

export const HOTEL_SEARCH_PATH_PATTERN = '/hotels/:locationCode/:checkIn/:checkOut/:guestsCount/:roomsCount';
