/* eslint-disable */

/**
 * Ink
 * Fills a container with an SVG object that provides feedback on mouse/touch
 * events with a rippling pool.
 */

import styles from './styles.css';
import React, { Component, PropTypes } from 'react';
import { getBlotOpacity, getRadius }  from './equations';

import { TWO_PI, OPACITY, ON_CLICK_DURATION, DURATION } from './constants';

class Ink extends Component {

  constructor(props) {
    super(props);
    this.state = {
      height      : 0,
      width       : 0,
    };
    this._frame = null;
    this._blots = [];
    this._playing = false;
  }

  componentWillUnmount() {
    this.stop();
  }

  handleClick(e) {
    this.setupCanvas();
    this._blots.push(this.createBlot(e.clientX, e.clientY));
    this.play();
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

    this._blots.forEach(blot => this.drawBlot(blot));

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

  createBlot(clientX, clientY) {
    let el = this.refs.canvas;
    let { top, bottom, left, right } = el.getBoundingClientRect();
    const height = bottom - top;
    const width = right - left;

    return {
      created: Date.now(),
      radius: Math.max(height, width),
      x: clientX - left,
      y: clientY - top
    };
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

  update() {
    this._blots = this._blots.filter(blot => Date.now() - blot.created < DURATION);
    if (this._blots.length) {
      this._frame = requestAnimationFrame(this.update.bind(this));
      this.tick();
    } else {
      this.stop()
    }
  }

  stop() {
    if (this._playing) {
      this._playing = false;
      cancelAnimationFrame(this._frame);
    }
  }

  play() {
    if (!this._playing) {
      this._playing = true;
      this.update()
    }
  }
}

Ink.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Ink;
/* eslint-enable */
