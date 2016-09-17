/* eslint-disable */

/**
 * Ink
 * Fills a container with an SVG object that provides feedback on mouse/touch
 * events with a rippling pool.
 */

import pixelRatio from './pixelRatio';
import styles from './styles.css';
import React, { Component, PropTypes } from 'react';
import Store from './store';
import { getBlotShiftX, getBlotShiftY, getBlotOpacity, getBlotScale }  from './equations';

const TAU = Math.PI * 2;
const MOUSE_LEFT = 0;
const OPACITY = 0.25;

class Ink extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color       : 'transparent',
      density     : 1,
      height      : 0,
      store       : Store(this.tick.bind(this)),
      width       : 0,
      onClickDuration: props.duration * 0.3,
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

  componentWillUnmount() {
    this.state.store.stop();
  }

  handleClick(e) {
    this._onPress(e);
    setTimeout(() => this.state.store.release(Date.now()), 1);
    setTimeout(this.props.onClick, this.state.onClickDuration);
  }

  tick() {
    let { ctx, color, density, height, width, store } = this.state

    ctx.save()

    ctx.scale(density, density)

    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = color

    store.each(this.drawBlot, this)

    ctx.restore()
  }

  drawBlot(blot) {
    let { ctx } = this.state;
    let { x, y, radius } = blot;

    ctx.globalAlpha = getBlotOpacity(blot, OPACITY);
    ctx.beginPath()

    ctx.arc(x, y, radius * getBlotScale(blot), 0, TAU)

    ctx.closePath()
    ctx.fill()
  }

  addBlot(timeStamp, clientX, clientY) {
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

    this.setState({ color, ctx, density, height, width }, () => {
      this.state.store.add({
        duration  : this.props.duration,
        mouseDown : timeStamp,
        mouseUp   : 0,
        radius    : Math.max(height, width),
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
    let { button, ctrlKey, clientX, clientY, changedTouches } = e;
    let timeStamp = Date.now()

    if (changedTouches) {
      for (var i = 0; i < changedTouches.length; i++) {
        let { clientX, clientY } = changedTouches[i];
        this.addBlot(timeStamp, clientX, clientY)
      }
    } else if (button === MOUSE_LEFT && !ctrlKey) {
      this.addBlot(timeStamp, clientX, clientY)
    }
  }
}

Ink.propTypes = {
  onClick: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

Ink.defaultProps = {
  duration: 1000,
};

export default Ink;
/* eslint-enable */
