import { Block } from '../../block/block.ts';
import './link.css';

export type LinkProps = {
  title: string;
  url?: string;
  click?: EventListener;
};

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    const { url = '', click } = props;

    super("a", { props, attributes: { 'class': 'link', 'href': url }, events: click ? { click } : {} });
  }

  render() {
    const fragment = document.createElement('span');

    fragment.innerHTML = this.props.title;
    return fragment;
  }
}
