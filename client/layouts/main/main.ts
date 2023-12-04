import { Block } from '../../block/block.ts';
import { ConnectedMenu } from '../../components/menu/menu.ts';
import './main.css';

type MainProps = {
  children: Block | Block[];
};

const mainTemplate = `
{{{ menu }}}
<div class="main__content">
  {{#each content }}
    {{{ this }}}
  {{/each}}
</div>
`;

export class Main extends Block<Record<string, any>> {
  constructor({ children }: MainProps) {
    const menu = new ConnectedMenu();
    const content = Array.isArray(children) ? children : [children];

    super(
      { children: { content, menu }, attributes: { class: 'main' } },
      mainTemplate
    );
  }
}
