type EventCallback = {
  (...args: any[]): void;
};

export class EventBus {
  listeners: { [event: string]: EventCallback[] };

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: EventCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: EventCallback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}
