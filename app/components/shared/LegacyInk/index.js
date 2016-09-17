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
    this.addBlot(e.clientX, e.clientY);
    setTimeout(() => this.state.store.release(Date.now()), 1);
    setTimeout(this.props.onClick, this.state.onClickDuration);
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

  addBlot(clientX, clientY) {
    let el = this.refs.canvas;
    let { top, bottom, left, right } = el.getBoundingClientRect();
    const height = bottom - top;
    const width = right - left;

    this.setState({
      color: window.getComputedStyle(el),
      ctx: this.getContext(),
      density: pixelRatio(this.getContext()),
      height,
      width,
    }, () => {
      this.state.store.add({
        duration  : this.props.duration,
        mouseDown : Date.now(),
        mouseUp   : 0,
        radius    : Math.max(height, width),
        x         : clientX - left,
        y         : clientY - top
      })
    })
  }

  getContext() {
    if (!this._canvasContext) {
      let el = this.refs.canvas

      // 0.13 support
      if (el instanceof window.HTMLCanvasElement === false) {
        el = el.getDOMNode()
      }

      this._canvasContext = el.getContext('2d');
    }
    return this._canvasContext;
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
