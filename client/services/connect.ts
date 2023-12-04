import { Block } from '../block/block';
import store, { StoreEvents, State } from './store';
import { isEqual } from '../utils/is-equal';

export function connect<
  T extends Record<string, any>,
  P extends Record<string, any>
>(
  Component: typeof Block<T>,
  mapStateToProps: (state: State) => P
): typeof Block<Omit<T, keyof P>> {
  return class extends Component {
    constructor(props: T) {
      let currentState = mapStateToProps(store.getState()) as Partial<T>;

      super({ ...props, ...currentState });

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState()) as Partial<T>;
        if (!isEqual(currentState, newState)) {
          const children = this.getChildrenFromNewProps(newState);
          // console.log('store update', this, children);
          // console.log('new', JSON.parse(JSON.stringify(newState)));
          // console.log('old', JSON.parse(JSON.stringify(currentState)));

          this.setPropsAndChildren({ ...newState, children });
          currentState = newState;

          this.stateChangeCallback();
        }
      });
    }
  } as typeof Block<Omit<T, keyof P>>;
}
