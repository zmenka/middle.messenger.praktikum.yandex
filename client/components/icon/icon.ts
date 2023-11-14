import { Block } from '../../block/block.ts';
import { IconTypes, IconSvgs } from './icon-resourses.ts';

import './icon.css';

const iconTemplate = `{{{ svg }}}`;

export type IconProps = {
  className?: string;
  isActive?: boolean;
  type: IconTypes;
  isButton?: boolean;
  click?: EventListener;
};

export class Icon extends Block {
  constructor({ className, isActive, type, isButton, click }: IconProps) {
    const attributes = { 'class': `icon ${className || ''}` };
    if (isActive) {
      attributes['class'] = `${attributes['class']} icon_active`;
    }
    super(isButton ? 'button' : 'i', { props: { type }, attributes, events: click ? { click } : {}  });
  }

  render() {
    const { type } = this.props;
    return this.compile(iconTemplate, { svg: IconSvgs[type as IconTypes] });
  }
}
