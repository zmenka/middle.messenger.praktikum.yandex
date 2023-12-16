import { Block } from '../../block/block.ts';
import router, { RouterPaths } from '../../services/router/router.ts';
import { getPathWithParams } from '../../utils/path.ts';
import './link.css';

export type LinkProps = {
  title: string;
  url?: RouterPaths;
  params?: Record<string, string>;
  click?: EventListener;
};

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    const { url, click, params = {} } = props;

    const path = url ? getPathWithParams(url, params) : '#';

    const onClick = (event: Event) => {
      event.preventDefault();

      if (click) {
        click(event);
      }

      url && router.go(url, params);
    };

    super(
      {
        ...props,
        attributes: { class: 'link', href: path },
        events: { click: onClick },
      },
      undefined,
      'a'
    );
  }

  render() {
    const fragment = document.createElement('span');

    fragment.innerHTML = this.props.title;
    return fragment;
  }
}
