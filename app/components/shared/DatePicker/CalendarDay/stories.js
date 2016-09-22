import React from 'react';
import { storiesOf } from '@kadira/storybook'; // eslint-disable-line
import CalendarDay from './index';

storiesOf('CalendarDay', module)
  .add('normal day', () => (
    <CalendarDay />
  ))
  .add('selected holiday', () => (
    <CalendarDay selected />
  ))
  .add('holiday', () => (
    <CalendarDay holiday />
  ))
  .add('highlighted day', () => (
    <CalendarDay highlighted />
  ))
  .add('disabled day', () => (
    <CalendarDay disabled />
  ))
  .add('weekend', () => (
    <CalendarDay weekend />
  ));
