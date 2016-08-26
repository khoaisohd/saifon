export const pathToHotelSearch = search => `/hotels/${search.locationCode}/${search.checkIn}/${search.checkOut}/${search.guestsCount}/${search.roomsCount}`;

export const HOTEL_SEARCH_PATH_PATTERN = '/hotels/:locationCode/:checkIn/:checkOut/:guestsCount/:roomsCount';
