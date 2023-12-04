import { Block } from '../../block/block.ts';
import { Icon } from '../../components/icon/icon.ts';
import { IconTypes } from '../../components/icon/icon-resourses.ts';
import router, { RouterPaths } from '../../services/router.ts';
import { connect } from '../../services/connect.ts';
import { State } from '../../services/store.ts';
import { getPathWithoutParams } from '../../utils/path.ts';

import './menu.css';

const menuTemplate = `
{{#each menus }}
{{{ this }}}
{{/each}}
`;

export type MenuProps = {
  currentPath: string;
};

class Menu extends Block<MenuProps> {
  menus: { [key: string]: Icon };

  constructor({ currentPath }: MenuProps) {
    const menus: { [key: string]: Icon } = {
      [getPathWithoutParams(RouterPaths.Profile)]: new Icon({
        type: IconTypes.AVATAR,
        click: () => router.go(RouterPaths.Profile)
      }),
      [getPathWithoutParams(RouterPaths.Chats)]: new Icon({
        type: IconTypes.CHAT,
        click: () => router.go(RouterPaths.Chats)
      }),
      [getPathWithoutParams(RouterPaths.ChatSettings)]: new Icon({
        type: IconTypes.PLUS,
        click: () => router.go(RouterPaths.ChatSettings)
      }),
    };
    menus[currentPath]?.setActive(true);

    super({ currentPath, children: { menus: Object.values(menus) }, attributes: { 'class': 'menu' } }, menuTemplate, 'nav');

    this.menus = menus;
  }
}

function mapStateToProps({ currentPath }: State): MenuProps{
  return {
    currentPath: getPathWithoutParams(currentPath)
  };
}

export const ConnectedMenu = connect(Menu, mapStateToProps);
