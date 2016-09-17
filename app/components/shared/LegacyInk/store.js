/* eslint-disable */

/**
 * Ink Store
 * Keeps track of changes to ripple epicenters
 * so that <Ink /> can focus on rendering them.
 */

import { getBlotOuterOpacity } from './equations';

let killStale = ({ mouseUp, duration }) => !mouseUp || (Date.now() - mouseUp) < duration

export default function(publicize) {
  let blots    = []
  let _playing = false
  let _frame

  let Store = {

    getBlots() {
      return blots;
    },

    play() {
      if (!_playing) {
        _playing = true
        Store.update()
      }
    },

    stop() {
      _playing = false;
      cancelAnimationFrame(_frame)
    },

    getTotalOpacity(opacity) {
      let answer = 0

      for (var i = 0, l = blots.length; i < l; i++) {
        answer += getBlotOuterOpacity(blots[i], opacity)
      }

      return answer
    },

    update() {
      blots = blots.filter(killStale)

      if (blots.length) {
        _frame = requestAnimationFrame(Store.update)
        publicize()
      } else {
        Store.stop()
      }
    },

    add(props) {
      blots.push(props)
      Store.play()
    },

    release(time) {
      for (let i = blots.length - 1; i >= 0; i--) {
        if (!blots[i].mouseUp) {
          return blots[i].mouseUp = time
        }
      }
    }

  }

  return Store
}

/* eslint-enable */
