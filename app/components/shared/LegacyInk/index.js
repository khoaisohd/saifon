/* eslint-disable */

import styles from './styles.css';
import React, { Component, PropTypes } from 'react';
import { getBlotOpacity, getRadius }  from './equations';

import { TWO_PI, OPACITY, ON_CLICK_DURATION, DURATION } from './constants';

class Ink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
    };
    this._frame = null;
    this._blots = [];
    this._waving = false;
  }

  componentWillUnmount() {
    this.stopWaving();
  }

  handleClick(e) {
    this.setupCanvas();
    this._blots.push(this.createBlot(e.clientX, e.clientY));
    this.starWaving();
    setTimeout(this.props.onClick, ON_CLICK_DURATION);
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

  starWaving() {
    if (!this._waving) {
      this._waving = true;
      this.wave();
    }
  }

  stopWaving() {
    if (this._waving) {
      this._waving = false;
      cancelAnimationFrame(this._frame);
    }
  }

  wave() {
    this._blots = this._blots.filter(blot => Date.now() - blot.created < DURATION);
    if (this._blots.length) {
      let { height, width } = this.state;

      const ctx = this.getCanvasContext();

      ctx.save();

      ctx.clearRect(0, 0, width, height);

      this._blots.forEach(blot => this.drawBlot(blot));

      ctx.restore();

      this._frame = requestAnimationFrame(this.wave.bind(this));
    } else {
      this.stopWaving();
    }
  }

  drawBlot(blot) {
    let { x, y } = blot;

    const ctx = this.getCanvasContext();

    ctx.globalAlpha = getBlotOpacity(blot, OPACITY);

    ctx.beginPath();

    ctx.arc(x, y, getRadius(blot), 0, TWO_PI);

    ctx.closePath();
    ctx.fill()
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
}

Ink.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Ink;

/* eslint-enable */
