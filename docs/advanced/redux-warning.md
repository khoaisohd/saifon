# Redux Warning

## Too much of anything is bad

Keep Redux store as minimal as possible, if component can manage its state, let it do  
  
Location Picker directly call API and store 

```JS
handleInputChange(e) {
  const keyword = e.target.value;
  this.setState({ keyword });
  Api.searchHotelLocation(keyword).then(response => {
    this.setState({ locations: response.locations });
  });
}
```

Hotel details page

```JS
constructor(props) {
  super(props);
  const { checkIn, checkOut, guestsCount, locationCode, roomsCount, hotelId } = props;

  this.state = {
    isFetching: true,
    hotel: null,
  };

  Api.fetchHotelDetails({ checkIn, checkOut, guestsCount, locationCode, roomsCount }, hotelId).then(response => {
    this.setState({
      isFetching: false,
      hotel: response.hotel,
    });
  });
}
```