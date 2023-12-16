import { describe, it } from 'mocha';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

import { Block } from './block.ts';
import { render } from '../services/render.ts';

describe('Block', () => {
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
  });

  it('render button', () => {
    const block = new Block(undefined, '', 'button');
    render(block);

    expect(document.querySelector('button')).to.exist;
  });

  it('remove button', () => {
    const block = new Block(undefined, '', 'button');
    render(block);
    block.remove();

    expect(document.querySelector('button')).not.to.exist;
  });

  it('render button with handlebars template and props', () => {
    const block = new Block({ title: 'test' }, '{{title}}', 'button');
    render(block);

    expect(document.querySelector('button')?.textContent).to.equals('test');
  });

  it('rerender button after changing prop', () => {
    const block = new Block({ title: 'test' }, '{{title}}', 'button');
    render(block);

    block.setPropsAndChildren({ title: 'test2' });

    expect(document.querySelector('button')?.textContent).to.equals('test2');
  });

  it('render one child', () => {
    const child = new Block({ title: 'child' }, '{{title}}', 'p');
    const parent = new Block({ children: { child } }, '{{{ child }}}', 'div');
    render(parent);

    expect(document.querySelector('p')?.textContent).to.equals('child');
  });

  it('render array of children', () => {
    const child1 = new Block({ title: 'child1' }, '{{title}}', 'p');
    const child2 = new Block({ title: 'child2' }, '{{title}}', 'p');

    const parent = new Block(
      { children: { kids: [child1, child2] } },
      '{{{ kids }}}',
      'div'
    );
    render(parent);

    expect(document.querySelectorAll('p')).length(2);
  });

  it('change child prop', () => {
    const child = new Block({ title: 'child' }, '{{title}}', 'p');
    const parent = new Block({ children: { child } }, '{{{ child }}}', 'div');
    render(parent);

    child.setPropsAndChildren({ title: 'child2' });

    expect(document.querySelector('p')?.textContent).to.equals('child2');
  });

  it('set attribute from constructor', () => {
    const block = new Block({ attributes: { disabled: 'true' }}, '', 'button');
    render(block);

    expect(document.querySelector('button')?.hasAttribute('disabled')).to.be.true;
  });

  it('set attribute from method setAttribute', () => {
    const block = new Block(undefined, '', 'button');
    render(block);

    block.setAttribute('disabled', 'true');

    expect(document.querySelector('button')?.hasAttribute('disabled')).to.be.true;
  });

  it('remove attribute', () => {
    const block = new Block({ attributes: { disabled: 'true' }}, '', 'button');
    render(block);

    block.removeAttribute('disabled');

    expect(document.querySelector('button')?.hasAttribute('disabled')).to.be.false;
  });

  it('set className from method addClass', () => {
    const block = new Block(undefined, '', 'button');
    render(block);

    block.addClass(['test']);

    expect(document.querySelector('button')?.classList.contains('test')).to.be.true;
  });

  it('remove className', () => {
    const block = new Block(undefined, '', 'button');
    render(block);

    block.addClass(['test1', 'test2']);
    block.removeClass(['test1']);

    expect(document.querySelector('button')?.classList.contains('test2')).to.be.true;
    expect(document.querySelector('button')?.classList.contains('test1')).to.be.false;
  });
});
