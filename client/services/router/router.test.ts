import { describe, it } from 'mocha';
import { assert } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';

import { Router, RouterPaths } from './router.ts';
import { Block } from '../../block/block.ts';

describe('Router', () => {
  let router: Router;
  const fakeBlockConstructor = () => new Block();
  const sandbox = sinon.createSandbox();
  let blockCreatorSpy: sinon.SinonSpy;

  beforeEach(() => {
    const dom = new JSDOM('<body></body>', { url: 'http://localhost/sign-up' });

    // @ts-expect-error: because of typing conflict
    global.window = dom.window;
    global.document = dom.window.document;

    blockCreatorSpy = sandbox.spy(fakeBlockConstructor);

    router = new Router();

    router
      .use(RouterPaths.SignUp, fakeBlockConstructor)
      .use(RouterPaths.SignIn, fakeBlockConstructor)
      .use(RouterPaths.Profile, fakeBlockConstructor)
      .use(RouterPaths.Chats, blockCreatorSpy)
      .use(RouterPaths.ChatSettings, fakeBlockConstructor)
      .start();
  });

  afterEach(() => {
    delete (global as any).window;
    delete (global as any).document;

    sandbox.restore();
  });

  it('go to Profile page', () => {
    router.go(RouterPaths.Profile);

    assert.equal(window.location.pathname, RouterPaths.Profile);
  });

  it('redirect to sign-in if it is an unknown url', () => {
    // @ts-expect-error: check unknown url
    router.go('/unknown');

    assert.equal(window.location.pathname, RouterPaths.SignIn);
  });

  it('check creating Block on new route', () => {
    router.go(RouterPaths.Chats);

    assert.equal(blockCreatorSpy.callCount, 1);
  });

  it('check not creating Block on the same route but different query params', () => {
    router.go(RouterPaths.Chats);
    router.go(RouterPaths.Chats, { chatId: 123 });

    assert.equal(blockCreatorSpy.callCount, 1);
  });
});
