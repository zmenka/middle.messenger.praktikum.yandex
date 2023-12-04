import { EventBus } from './event-bus';
import { getPathWithParams } from '../utils/path';

const WS_URL = 'wss://ya-praktikum.tech/ws/chats/:userId/:chatId/:token';

export class WS extends EventBus {
  static EVENTS = {
    OPEN: "WS:open",
    CONNECTED: "WS:connected",
    MESSAGE: "WS:message",
    ERROR: "WS:error",
    CLOSE: "WS:close"
  };

  socket?: WebSocket;
  ping: NodeJS.Timeout;
  pingInterval = 30000;
  url: string;

  constructor(userId: number, chatId: number, token: string) {
    super();
    this.url = getPathWithParams(WS_URL, { userId, chatId, token });
    console.log('WS INIT')
  }

  send(data: string | object) {
    if (!this.socket) {
      throw new Error('no socket');
    }

    this.socket.send(JSON.stringify(data));
  }

  sendMessage(data: string) {
    this.send({ type: 'message', content: data });
  }

  requestMessages(offset: number = 0) {
    this.send({ type: 'get old', content: offset });
  }

  connect() {
    if (this.socket) {
      throw new Error('socket already exists');
    }

    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setupPing();

    return new Promise<void>((resolve, reject) => {
      this.on(WS.EVENTS.ERROR, reject);
      this.on(WS.EVENTS.CONNECTED, () => {
        this.off(WS.EVENTS.ERROR, reject);
        resolve();
      })
    })
  }

  close() {
    this.socket?.close();
    clearInterval(this.ping);
  }

  setupPing() {
    this.ping = setInterval(() => {
      this.send({ type: 'ping'})
    }, this.pingInterval);

    this.on(WS.EVENTS.CLOSE, () => {
      clearInterval(this.ping);
    })
  }

  subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WS.EVENTS.CONNECTED);
    })

    socket.addEventListener('close', () => {
      this.emit(WS.EVENTS.CLOSE);
    })

    socket.addEventListener('error', (error) => {
      this.emit(WS.EVENTS.ERROR, error);
    })

    socket.addEventListener('message', (message) => {
      try {
        const data = JSON.parse(message.data);

        if (['pong', 'user connected'].includes(data.type)) {
          return;
        }

        this.emit(WS.EVENTS.MESSAGE, data);
      } catch (e) {
        console.log('WS', e);
      }
    })
  }
}

