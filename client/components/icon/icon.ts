import { Block } from '../../block/block.ts';
import { IconTypes, IconSvgs } from './icon-resourses.ts';

import './icon.css';

const iconTemplate = `{{{ svg }}}`;

export type IconProps = {
  className?: string;
  isActive?: boolean;
  type: IconTypes;
  click?: EventListener;
};

export class Icon extends Block<IconProps> {
  constructor(props: IconProps) {
    const { className, isActive, click } = props;
    const attributes = { class: `icon ${className || ''}` };
    if (isActive) {
      attributes['class'] = `${attributes['class']} icon_active`;
    }
    super(
      { ...props, attributes, events: click ? { click } : {} },
      iconTemplate,
      click ? 'button' : 'i'
    );
  }

  render() {
    const { type } = this.props;

    return this.compile({ svg: IconSvgs[type as IconTypes] });
  }

  setActive(isActive: boolean) {
    isActive
      ? this.addClass(['icon_active'])
      : this.removeClass(['icon_active']);
  }
}
