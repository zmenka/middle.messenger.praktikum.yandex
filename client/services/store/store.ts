import { User, Chat } from '../../utils/data.ts';
import { set } from '../../utils/set.ts';
import { EventBus } from '../event-bus.ts';

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

export class Store extends EventBus {
  private state: State = {
    currentPath: '',
    queryParams: {},
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }

  public clean() {
    this.state = {
      currentPath: '',
      queryParams: {},
    };
  }
}

export const currentStore = new Store();
export default currentStore;
