import { User, Chat } from '../utils/data';
import { set } from '../utils/set';
import { EventBus } from './event-bus';

export enum StoreEvents {
  Updated = 'STORE:updated',
}

export type State = {
  user?: User;
  chatsMap?: Record<number, Chat>;
  chatsOrder?: number[];
  selectedChat?: Chat;
  currentPath: string;
  queryParams: Record<string, string>;
};

class Store extends EventBus {
  private state: State = {
    currentPath: '',
    queryParams: {},
  };

  constructor() {
    super();
  }

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
