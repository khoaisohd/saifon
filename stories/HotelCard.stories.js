import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line
import HotelCard from '../app/components/HotelCard';

const fiveStarHotel = {
  name: 'Shangri-La Hotel, Singapore',
  address: 'Orchard Road',
  cityName: 'Singapore',
  score: 83,
  star: 5,
  price: {
    amount: 432,
    currencyCode: 'SGD',
  },
  reviewCount: 2203,
  reviewSentiment: 'Excellent',
  imageUrl: 'https://res.cloudinary.com/wego/w_180,h_180,c_fill,f_auto,fl_lossy,q_80/v1412096119/hotels/258013/12441666.jpg',
};

const fourStarHotel = {
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
};

const threeStarHotel = {
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
};

const twoStarHotel = {
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
};

storiesOf('HotelCard', module)
  .add('Excellent', () => (
    <div>
      <HotelCard hotel={fiveStarHotel} />
    </div>
  ))
  .add('Very Good', () => (
    <HotelCard hotel={fourStarHotel} />
  ))
  .add('Fair (Orange)', () => (
    <HotelCard hotel={threeStarHotel} />
  ))
  .add('Fair (Red)', () => (
    <HotelCard hotel={twoStarHotel} />
  ));
