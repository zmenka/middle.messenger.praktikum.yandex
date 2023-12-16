import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import { Store, StoreEvents } from './store.ts';

describe('Store', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('set currentPath in state', () => {
    store.set('currentPath', '/settings');

    expect(store.getState()).to.include({ currentPath: '/settings' });
  });

  it('set user Id in state where user is undefined yet', () => {
    expect(store.getState()).to.not.have.property('user');

    store.set('user.id', 123);
    expect(store.getState()).to.deep.include({ user: { id : 123}});
  });

  it('check calling event on state change', () => {
    const spy = sinon.spy();
    store.on(StoreEvents.Updated, spy);

    store.set('currentPath', '/settings');

    expect(spy.called).to.be.true;
  });
});
