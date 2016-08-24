class Observable {
  constructor() {
    this.events = [];
  }

  fire(event) {
    const params = Array.prototype.slice.call(arguments).slice(1);
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].forEach(callback => callback.apply(this, params));
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
}

export default Observable;