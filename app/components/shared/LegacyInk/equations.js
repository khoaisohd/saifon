/* eslint-disable */

/**
 * @t is the current time (or position) of the tween. This can be seconds or frames, steps, seconds, ms, whatever – as long as the unit is the same as is used for the total time [3].
 * @b is the beginning value of the property.
 * @c is the change between the beginning and destination value of the property.
 * @d is the total time of the tween.
 */

const easing = (t, b, c, d) => c*((t=t/d-1)*t*t*t*t + 1) + b;

const  SQRT_2 = Math.sqrt(2);

const { cos, max, min } = Math;

const getPress = blot =>  min(blot.duration, Date.now() - blot.mouseDown);

const getRelease = blot => blot.mouseUp > 0 ? Date.now() - blot.mouseUp : 0;

function getRadius(blot) {
  let { duration, radius } = blot;

  let down       = easing(getPress(blot), 0, radius, duration) * 0.85;
  let up         = easing(getRelease(blot), 0, radius, duration) * 0.15;
  let undulation = radius * 0.02 * cos(Date.now() / duration);

  return max(0, down + up + undulation)
}

export const getBlotOpacity = (blot, opacity) => easing(getRelease(blot), opacity, -opacity, blot.duration);

export const getBlotOuterOpacity = (blot, opacity) => min(getBlotOpacity(blot, opacity), easing(getPress(blot), 0, 0.3, blot.duration * 3));

export const getBlotShiftX = (blot, size, width) => min(1, getRadius(blot) / size * 2 / SQRT_2) * (width / 2 - blot.x);

export const getBlotShiftY = (blot, size, height) => min(1, getRadius(blot) / size * 2 / SQRT_2) * (height / 2 - blot.y);

export const getBlotScale = (blot) => getRadius(blot) / blot.radius;

/* eslint-enable */
