import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line
import HotelCard from '../app/components/HotelCard';
import { fromJS } from 'immutable';

const fiveStarHotel = fromJS({
  address: '44B LY THUONG KIET St',
  cheapestRate: {
    price: {
      amount: 574,
      currencyCode: 'SGD',
    },
  },
  cityName: 'Hanoi',
  districtName: 'Hoan Kiem District - Consulates/Government',
  id: '111799',
  imageUrl: 'http://res.cloudinary.com/wego/image/upload/v1395103767/hotels/111799/15711099.jpg',
  name: 'Melia Hanoi',
  reviewCount: '1000',
  reviewDescription: 'Very Good',
  reviewScore: '80',
  star: 4.5,
});

const threeStarHotel = fromJS({
  address: '48 Tran Nhan Tong street n',
  cheapestRate: {
    price: {
      amount: 906,
      currencyCode: 'SGD',
    },
  },
  cityName: 'Hanoi',
  districtName: 'Pho Hue / Hom Market - Thong Nhat Park',
  id: '111797',
  imageUrl: 'http://res.cloudinary.com/wego/image/upload/v1395103123/hotels/111797/15713422.jpg',
  name: 'Ocean Hotel I',
  reviewCount: '5',
  reviewDescription: 'Poor',
  reviewScore: '71',
  star: 3,
});

const fourStarHotel = fromJS({
  address: '48 Tran Nhan Tong street n',
  cheapestRate: {
    price: {
      amount: 906,
      currencyCode: 'SGD',
    },
  },
  cityName: 'Hanoi',
  districtName: 'Pho Hue / Hom Market - Thong Nhat Park',
  id: '111797',
  imageUrl: 'http://res.cloudinary.com/wego/image/upload/v1395103123/hotels/111797/15713422.jpg',
  name: 'Ocean Hotel I',
  reviewCount: '500',
  reviewDescription: 'Very Good',
  reviewScore: '85',
  star: 4,
});


const twoStarHotel = fromJS({
  address: '1 Cam Chi St (Hang Bong) Hoan Kiem District, Hanoi',
  cheapestRate: {
    price: {
      amount: 800,
      currencyCode: 'SGD',
    },
  },
  cityName: 'Hanoi',
  districtName: 'Ba Dinh',
  id: '111798',
  imageUrl: 'http://res.cloudinary.com/wego/image/upload/v1397026892/hotels/111798/7678197.jpg',
  name: 'Hanoi Street Hotel',
  reviewCount: '35',
  reviewDescription: 'Poor',
  reviewScore: '63',
  star: 2,
});

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
