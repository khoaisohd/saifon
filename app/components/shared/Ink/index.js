import styles from './styles.css';
import React, { Component, PropTypes } from 'react';
import { getBlotOpacity, getRadius } from './equations';

import { TWO_PI, OPACITY, ON_CLICK_DURATION, DURATION } from './constants';

class Ink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
    };
    this.frame = null;
    this.blots = [];
    this.waving = false;
  }

  componentWillUnmount() {
    this.stopWaving();
  }

  setupCanvas() {
    if (!this.setupCanvasAlready) {
      const { top, bottom, left, right } = this.canvas.getBoundingClientRect();
      this.setState({
        height: bottom - top,
        width: right - left,
      });
      this.setupCanvasAlready = true;
    }
  }

  getCanvasContext() {
    if (!this.canvasContext) {
      let el = this.canvas;

      // 0.13 support
      if (el instanceof window.HTMLCanvasElement === false) {
        el = el.getDOMNode();
      }

      this.canvasContext = el.getContext('2d');
    }
    return this.canvasContext;
  }

  drawBlot(blot) {
    const { x, y } = blot;
    const ctx = this.getCanvasContext();

    ctx.globalAlpha = getBlotOpacity(blot, OPACITY);
    ctx.beginPath();
    ctx.arc(x, y, getRadius(blot), 0, TWO_PI);
    ctx.closePath();
    ctx.fill();
  }

  wave() {
    this.blots = this.blots.filter(blot => Date.now() - blot.created < DURATION);
    if (this.blots.length) {
      const ctx = this.getCanvasContext();
      ctx.save();
      ctx.clearRect(0, 0, this.state.width, this.state.height);
      this.blots.forEach(blot => this.drawBlot(blot));
      ctx.restore();

      this.frame = requestAnimationFrame(this.wave.bind(this));
    } else {
      this.stopWaving();
    }
  }

  stopWaving() {
    if (this.waving) {
      this.waving = false;
      cancelAnimationFrame(this.frame);
    }
  }

  starWaving() {
    if (!this.waving) {
      this.waving = true;
      this.wave();
    }
  }

  createBlot(clientX, clientY) {
    const el = this.canvas;
    const { top, bottom, left, right } = el.getBoundingClientRect();
    const height = bottom - top;
    const width = right - left;

    return {
      created: Date.now(),
      radius: Math.max(height, width),
      x: clientX - left,
      y: clientY - top,
    };
  }

  handleClick(e) {
    this.setupCanvas();
    this.blots.push(this.createBlot(e.clientX, e.clientY));
    this.starWaving();
    setTimeout(this.props.onClick, ON_CLICK_DURATION);
  }

  render() {
    return (
      <canvas
        className={styles.ink}
        ref={component => { this.canvas = component; }}
        height={this.state.height}
        width={this.state.width}
        onClick={this.handleClick.bind(this)}
      />
    );
  }
}

Ink.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Ink;
