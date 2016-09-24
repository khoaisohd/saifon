import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line
import DatePicker from './index';
import moment from 'moment';

storiesOf('DatePicker', module)
  .add('single date', () => (
    <div> <DatePicker /></div>
  ))
  .add('with a selected date', () => {
    const selected = moment().add(5, 'days');
    return (
      <div>
        <DatePicker selected={selected} />
      </div>
    );
  });
