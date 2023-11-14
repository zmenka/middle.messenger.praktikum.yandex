import { Block } from '../../block/block.ts';
import { Icon, IconProps } from '../../components/icon/icon.ts';
import './main.css';

type MainProps = {
  content: Block,
  menus: IconProps[]
};

const mainTemplate = `
<div class="main__menu">
	{{#each menus }}
		{{{ this }}}
	{{/each}}
</div>
<div class="main__content">
		{{{ content }}}
</div>
`;

export class Main extends Block {

  constructor({ menus: menusProps, content }: MainProps) {
    const menus = menusProps.map(menuProps => new Icon(menuProps));

    super("div", { children: { content, menus }, attributes: { class: 'main' }});
  }

  render() {
    return  this.compile(mainTemplate);
  }
}



