import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line
import StarFilter from 'components/StarFilter';
import { fromJS } from 'immutable';

const starRatings = fromJS({
  TWO_STAR: true,
  THREE_STAR: true,
  FOUR_STAR: false,
  FIVE_STAR: true,
});

storiesOf('StarFilter', module)
  .add('empty checkboxes', () => (
    <div>
      <StarFilter starRatings={fromJS({})} />
    </div>
  ))
  .add('preselected checkboxes', () => (
    <div>
      <StarFilter starRatings={starRatings} />
    </div>
  ));
