import { Block } from '../block/block.ts';

export function render(block: Block<any>) {
  const root = document.querySelector('.app');
  root?.appendChild(block.getContent());
}
