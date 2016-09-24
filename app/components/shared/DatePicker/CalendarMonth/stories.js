import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line
import CalendarMonth from './index';

storiesOf('CalendarMonth', module)
  .add('display one month', () => (
    <div><br /><br /><br />
      <CalendarMonth />
    </div>
  ));
