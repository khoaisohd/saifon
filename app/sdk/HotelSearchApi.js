class HotelSearchApi {
  submitSearch(search) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          hotels: [
            {
              id: 1,
              name: 'Carlton City Hotel',
              address: 'Chinatown',
              cityName: 'Singapore',
              score: 85,
              star: 4,
              price: {
                amount: 188,
                currencyCode: 'SGD',
              },
              reviewCount: 6462,
              reviewSentiment: 'Very Good',
              imageUrl: 'https://res.cloudinary.com/wego/w_180,h_180,c_fill,f_auto,fl_lossy,q_80/v1432226452/hotels/794499/12367362.jpg',
            },
            {
              id: 2,
              name: 'Fort Canning Lodge',
              address: 'Orchard Road',
              cityName: 'Singapore',
              score: 73,
              star: 3,
              price: {
                amount: 117,
                currencyCode: 'SGD',
              },
              reviewCount: 1714,
              reviewSentiment: 'Fair',
              imageUrl: 'https://res.cloudinary.com/wego/w_180,h_180,c_fill,f_auto,fl_lossy,q_80/v1412097168/hotels/258148/15165150.jpg',
            },
            {
              id: 3,
              name: 'Harbour Ville Hotel',
              address: 'Chinatown',
              cityName: 'Singapore',
              score: 61,
              star: 2,
              price: {
                amount: 91,
                currencyCode: 'SGD',
              },
              reviewCount: 1866,
              reviewSentiment: 'Fair',
              imageUrl: 'https://res.cloudinary.com/wego/w_180,h_180,c_fill,f_auto,fl_lossy,q_80/v1428063136/hotels/258299/1377232.jpg',
            },
          ]
        });
      }, 2000);
    });
  }
}

export default HotelSearchApi;