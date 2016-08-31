import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line
import StarRating from '../app/components/StarRating';

storiesOf('StarRating', module)
  .add('5 star hotel', () => (
    <div>
      <StarRating value={5} />
    </div>
  ))
  .add('4 star hotels', () => (
    <StarRating value={4} />
  ))
  .add('3 star hotels', () => (
    <StarRating value={3} />
  ))
  .add('2 star hotels', () => (
    <StarRating value={2} />
  ));
