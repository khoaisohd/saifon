export const getDisplayedHotels = state => state.getIn(['HotelSearchResult', 'displayedHotels']);

export const getFilters = state => state.getIn(['HotelSearchResult', 'filters']);

export const getSort = state => state.getIn(['HotelSearchResult', 'sort']);

export const getOffset = state => state.getIn(['HotelSearchResult', 'offset']);

export const getLimit = state => state.getIn(['HotelSearchResult', 'limit']);
