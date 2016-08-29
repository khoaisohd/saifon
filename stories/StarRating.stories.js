import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line
import StarRating from '../app/components/StarRating';

storiesOf('StarRating', module)
  .add('5 star hotel', () => (
    <div>
      <StarRating count={5} />
    </div>
  ))
  .add('4 star hotels', () => (
    <StarRating count={4} />
  ))
  .add('3 star hotels', () => (
    <StarRating count={3} />
  ))
  .add('2 star hotels', () => (
    <StarRating count={2} />
  ));
