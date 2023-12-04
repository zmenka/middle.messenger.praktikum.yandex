import { render } from './render.ts';
import { Block } from '../block/block.ts';
import { getPathWithoutParams } from '../utils/path.ts';
import { RouterPaths } from './router.ts';

export class Route {
  template: RouterPaths;
  _block: Block | null;
  _blockCreator: () => Block;

  constructor(template: RouterPaths, creator: () => Block) {
    this.template = template;
    this._block = null;
    this._blockCreator = creator;
  }

  leave() {
    if (this._block) {
      this._block.remove();
    }
  }

  match(path: string) {
    return getPathWithoutParams(path) === getPathWithoutParams(this.template);
  }

  render() {
    this._block = this._blockCreator();
    render(this._block);
  }
}
