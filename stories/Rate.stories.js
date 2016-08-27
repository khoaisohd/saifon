import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line
import Rate from '../app/components/HotelDetails/Rate';

const provider = {
  code: 'booking.com',
  name: 'booking.com',
  imageUrl: '//res.cloudinary.com/wego/c_fit,w_240,f_auto,fl_lossy,q_80/v20160824/providers/rectangular_logos/booking.com.png',
};

const rate = {
  description: '1 Bed Apartment Double Room',
  price: {
    currencyCode: 'PHP',
    amount: 330,
  },
  provider,
};

storiesOf('Rate', module)
  .add('hidden description', () => (
    <div>
      <Rate rate={rate} provider={provider} />
    </div>
  ))
  .add('showing description', () => (
    <div>
      <Rate rate={rate} showDescription />
    </div>
  ));
