import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line
import StarRatingsFilter from '../app/components/StarRatingsFilter';
import { fromJS } from 'immutable';

const starRatings = fromJS({
  TWO_STAR: true,
  THREE_STAR: true,
  FOUR_STAR: false,
  FIVE_STAR: true,
});

storiesOf('StarRatingsFilter', module)
  .add('empty checkboxes', () => (
    <div>
      <StarRatingsFilter starRatings={fromJS({})} />
    </div>
  ))
  .add('preselected checkboxes', () => (
    <div>
      <StarRatingsFilter starRatings={starRatings} />
    </div>
  ));
