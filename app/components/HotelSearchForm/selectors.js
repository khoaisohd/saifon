export const getCheckIn = state => state.getIn(['HotelSearchForm', 'checkIn']);
export const getCheckOut = state => state.getIn(['HotelSearchForm', 'checkOut']);
export const getLocation = state => state.getIn(['HotelSearchForm', 'location']);
export const getRoomsCount = state => state.getIn(['HotelSearchForm', 'roomsCount']);
export const getGuestsCount = state => state.getIn(['HotelSearchForm', 'guestsCount']);
export const isCheckOutSelected = state => state.getIn(['HotelSearchForm', 'checkOutSelected']);
