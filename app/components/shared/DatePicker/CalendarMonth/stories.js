import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line
import CalendarMonth from './index';
import moment from 'moment';

storiesOf('CalendarMonth', module)
  .add('display one month', () => (
    <div><br /><br /><br />
      <CalendarMonth />
    </div>
  ))
  .add('display 12 months', () => {
    const months = new Array(12).fill().map((val, i) => i);
    return (
      <div>
        { months.map((i) => {
          const currentMonth = moment().add(i, 'month');
          return (
            <div key={i} >
              <CalendarMonth month={currentMonth} />
            </div>
          );
        })}
      </div>
    );
  });
