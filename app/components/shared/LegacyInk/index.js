/* eslint-disable */

/**
 * Ink
 * Fills a container with an SVG object that provides feedback on mouse/touch
 * events with a rippling pool.
 */

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
      height      : 0,
      width       : 0,
    };
    this._store = Store(this.tick.bind(this));
    this._onClickDuration = props.duration * 0.3;
  }

  componentWillUnmount() {
    this._store.stop();
  }

  handleClick(e) {
    this.setupCanvas();
    this.addBlot(e.clientX, e.clientY);
    setTimeout(() => this._store.release(Date.now()), 1);
    setTimeout(this.props.onClick, this._onClickDuration);
  }

  render() {
    return (
      <canvas
        className={styles.ink}
        ref="canvas"
        height={ this.state.height }
        width={ this.state.width }
        onClick={this.handleClick.bind(this)}
      />
    )
  }

  tick() {
    let { height, width } = this.state;

    const ctx = this.getContext();

    ctx.save()

    ctx.clearRect(0, 0, width, height)

    this._store.getBlots().forEach(blot => this.drawBlot(blot));

    ctx.restore()
  }

  drawBlot(blot) {
    let { x, y, radius } = blot;

    const ctx = this.getContext();

    ctx.globalAlpha = getBlotOpacity(blot, OPACITY);

    ctx.beginPath();

    ctx.arc(x, y, radius * getBlotScale(blot), 0, TAU);

    ctx.closePath();
    ctx.fill()
  }

  addBlot(clientX, clientY) {
    let el = this.refs.canvas;
    let { top, bottom, left, right } = el.getBoundingClientRect();
    const height = bottom - top;
    const width = right - left;

    this._store.add({
      duration  : this.props.duration,
      mouseDown : Date.now(),
      mouseUp   : 0,
      radius    : Math.max(height, width),
      x         : clientX - left,
      y         : clientY - top
    });
  }

  setupCanvas() {
    if (!this._setupCanvas) {
      const { top, bottom, left, right } = this.refs.canvas.getBoundingClientRect();
      this.setState({
        height: bottom - top,
        width: right - left,
      });
      this._setupCanvas = true;
    }
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
