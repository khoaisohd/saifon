/* eslint-disable */

/**
 * Ink
 * Fills a container with an SVG object that provides feedback on mouse/touch
 * events with a rippling pool.
 */

const MOUSE_LEFT = 0;
import pixelRatio from './util/pixelRatio';
import styles from './styles.css';
import React, { Component, PropTypes } from 'react';
import Store from './util/store';
let Types      = React.PropTypes
let TAU        = Math.PI * 2
import Equations  from './util/equations';


class Ink extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color       : 'transparent',
      density     : 1,
      height      : 0,
      store       : Store(this.tick.bind(this)),
      width       : 0
    }
  }

  shouldComponentUpdate(props, state) {
    for (let p in props) {
      if (this.props[p] !== props[p]) return true;
    }

    for (let s in state) {
      if (this.state[s] !== state[s]) return true;
    }

    return false;
  }

  handleClick(e) {
    this._onPress(e);
    setTimeout(() => this.state.store.release(Date.now()), 1);
    setTimeout(this.props.onClick, 400);
  }

  tick() {
    let { ctx, color, density, height, width, store } = this.state

    ctx.save()

    ctx.scale(density, density)

    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = color

    if (this.props.background) {
      ctx.globalAlpha = store.getTotalOpacity(this.props.opacity)
      ctx.fillRect(0, 0, width, height)
    }

    store.each(this.makeBlot, this)

    ctx.restore()
  }

  makeBlot(blot) {
    let { ctx, height, width } = this.state
    let { x, y, radius } = blot

    ctx.globalAlpha = Equations.getBlotOpacity(blot, this.props.opacity)
    ctx.beginPath()

    if (this.props.recenter) {
      let size = Math.max(height, width)

      x += Equations.getBlotShiftX(blot, size, width)
      y += Equations.getBlotShiftY(blot, size, height)
    }

    ctx.arc(x, y, radius * Equations.getBlotScale(blot), 0, TAU)

    ctx.closePath()
    ctx.fill()
  }

  componentWillUnmount() {
    this.state.store.stop()
  }

  pushBlot(timeStamp, clientX, clientY) {
    let el = this.refs.canvas

    // 0.13 support
    if (el instanceof window.HTMLCanvasElement === false) {
      el = el.getDOMNode()
    }

    let { top, bottom, left, right } = el.getBoundingClientRect()
    let { color }                    = window.getComputedStyle(el)

    let ctx     = this.state.ctx || el.getContext('2d');
    let density = pixelRatio(ctx)
    let height  = bottom - top
    let width   = right - left
    let radius  = Equations.getMaxRadius(height, width, this.props.radius)

    this.setState({ color, ctx, density, height, width }, () => {
      this.state.store.add({
        duration  : this.props.duration,
        mouseDown : timeStamp,
        mouseUp   : 0,
        radius    : radius,
        x         : clientX - left,
        y         : clientY - top
      })
    })
  }

  render() {
    const { density, height, width } = this.state;

    return (
      <canvas
        className={styles.ink}
        ref="canvas"
        height={ height * density }
        width={ width * density }
        onClick={this.handleClick.bind(this)}
      />
    )
  }

  _onPress(e) {
    let { button, ctrlKey, clientX, clientY, changedTouches } = e
    let timeStamp = Date.now()

    if (changedTouches) {
      for (var i = 0; i < changedTouches.length; i++) {
        let { clientX, clientY } = changedTouches[i]
        this.pushBlot(timeStamp, clientX, clientY)
      }
    } else if (button === MOUSE_LEFT && !ctrlKey) {
      this.pushBlot(timeStamp, clientX, clientY)
    }
  }
}

Ink.propTypes = {
  background : Types.bool,
  duration   : Types.number,
  opacity    : Types.number,
  radius     : Types.number,
  recenter   : Types.bool,
};

Ink.defaultProps = {
  background : true,
  duration   : 1000,
  opacity    : 0.25,
  radius     : 150,
  recenter   : true,
};

export default Ink;
/* eslint-enable */
