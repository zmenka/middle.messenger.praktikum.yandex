import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';

import { Block } from '../../block/block.ts';
import { render } from '../render.ts';
import { connect } from './connect.ts';
import store from '../store/store.ts';

class PBlock extends Block {
  constructor(props: { title: string }) {
    super(props,  '{{title}}', 'p');
  }
}

describe('connect', () => {
  beforeEach(() => {
    const dom = new JSDOM(
      `
    <!DOCTYPE html>
    <html lang="en">
      <body>
        <main class="app"></main>
      </body>
    </html>,
    `,
      {
        url: 'http://localhost',
      }
    );

    // @ts-expect-error: because of typing conflict
    global.window = dom.window;
    global.document = dom.window.document;
  });

  afterEach(() => {
    delete (global as any).window;
    delete (global as any).document;

    sinon.restore();

    store.clean();
  });

  it('render connected to store block', () => {
    store.set('user.login', 'test-login');

    const ConnectedBlock = connect(PBlock, (state) => ({ title: state?.user?.login }));

    const block = new ConnectedBlock();

    render(block);

    expect(document.querySelector('p')?.textContent).to.equals('test-login');
  });

  it('rerender connected block when store has changed', () => {
    store.set('user.login', 'test-login');

    const ConnectedBlock = connect(PBlock, (state) => ({ title: state?.user?.login }));

    const block = new ConnectedBlock();

    render(block);

    store.set('user.login', 'another-login');

    expect(document.querySelector('p')?.textContent).to.equals('another-login');
  });
});
