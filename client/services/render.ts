import { Block } from '../block/block.ts';

export function render(
  block: Block,
  query: string = '.app',
  replace: boolean = false
) {
  const root = document.querySelector(query);
  if (replace) {
    root?.replaceWith(block.getContent());
  } else {
    root?.appendChild(block.getContent());
  }
}
