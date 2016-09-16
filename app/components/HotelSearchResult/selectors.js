export const getDisplayedHotels = state => state.getIn(['HotelSearchResult', 'displayedHotels']);

export const getFilter = state => state.getIn(['HotelSearchResult', 'filter']);

export const getSort = state => state.getIn(['HotelSearchResult', 'sort']);

export const getOffset = state => state.getIn(['HotelSearchResult', 'offset']);

export const getLimit = state => state.getIn(['HotelSearchResult', 'limit']);

export const isLoading = state => state.getIn(['HotelSearchResult', 'loading']);

export const hasNoResult = state => state.getIn(['HotelSearchResult', 'hasNoResult']);

export const canLoadMore = state => state.getIn(['HotelSearchResult', 'canLoadMore']);
