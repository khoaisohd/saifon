export const getHotelSearchPath = search => {
  const { locationCode, checkIn, checkOut, roomsCount, guestsCount } = search;
  return `/hotels/${locationCode}/${checkIn}/${checkOut}/${guestsCount}/${roomsCount}`;
};

export const HOTEL_SEARCH_PATH_PATTERN = '/hotels/:locationCode/:checkIn/:checkOut/:guestsCount/:roomsCount';