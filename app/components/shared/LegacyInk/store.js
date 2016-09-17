/* eslint-disable */

/**
 * Ink Store
 * Keeps track of changes to ripple epicenters
 * so that <Ink /> can focus on rendering them.
 */

let killStale = ({ created, duration }) => !created || (Date.now() - created) < duration

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
  }

  return Store
}

/* eslint-enable */
