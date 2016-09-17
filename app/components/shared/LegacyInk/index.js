/* eslint-disable */

/**
 * Ink
 * Fills a container with an SVG object that provides feedback on mouse/touch
 * events with a rippling pool.
 */

import styles from './styles.css';
import React, { Component, PropTypes } from 'react';
import Store from './store';
import { getBlotOpacity, getRadius }  from './equations';

import { TWO_PI, OPACITY, ON_CLICK_DURATION } from './constants';

class Ink extends Component {

  constructor(props) {
    super(props);
    this.state = {
      height      : 0,
      width       : 0,
    };
    this._store = Store(this.tick.bind(this));
  }

  componentWillUnmount() {
    this._store.stop();
  }

  handleClick(e) {
    this.setupCanvas();
    this.addBlot(e.clientX, e.clientY);
    setTimeout(this.props.onClick, ON_CLICK_DURATION);
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

    const ctx = this.getCanvasContext();

    ctx.save()

    ctx.clearRect(0, 0, width, height)

    this._store.getBlots().forEach(blot => this.drawBlot(blot));

    ctx.restore()
  }

  drawBlot(blot) {
    let { x, y, radius } = blot;

    const ctx = this.getCanvasContext();

    ctx.globalAlpha = getBlotOpacity(blot, OPACITY);

    ctx.beginPath();

    ctx.arc(x, y, getRadius(blot), 0, TWO_PI);

    ctx.closePath();
    ctx.fill()
  }

  addBlot(clientX, clientY) {
    let el = this.refs.canvas;
    let { top, bottom, left, right } = el.getBoundingClientRect();
    const height = bottom - top;
    const width = right - left;

    this._store.add({
      created: Date.now(),
      radius: Math.max(height, width),
      x: clientX - left,
      y: clientY - top
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

  getCanvasContext() {
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
};

export default Ink;
/* eslint-enable */
