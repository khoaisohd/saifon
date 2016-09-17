/* eslint-disable */

/**
 * @t is the current time (or position) of the tween. This can be seconds or frames, steps, seconds, ms, whatever – as long as the unit is the same as is used for the total time [3].
 * @b is the beginning value of the property.
 * @c is the change between the beginning and destination value of the property.
 * @d is the total time of the tween.
 */

const easing = (t, b, c, d) => c*((t=t/d-1)*t*t*t*t + 1) + b;

import { SQRT_2, DURATION } from './constants';

const { cos, max, min } = Math;

const getPress = blot =>  min(DURATION, Date.now() - blot.created);

const getRelease = blot => Date.now() - blot.created;

export const getRadius = blot => {
  let { radius } = blot;
  let down       = easing(getPress(blot), 0, radius, DURATION) * 0.85;
  let up         = easing(getRelease(blot), 0, radius, DURATION) * 0.15;
  let undulation = radius * 0.02 * cos(Date.now() / DURATION);

  return max(0, down + up + undulation)
}

export const getBlotOpacity = (blot, opacity) => easing(getRelease(blot), opacity, -opacity, DURATION);

/* eslint-enable */
