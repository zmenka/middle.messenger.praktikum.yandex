import { Block } from '../../block/block.ts';
import { Link } from '../../components/link/link.ts';
import { RouterPaths } from '../../services/router.ts'
import './error.css';

const errorTemplate = `
<div class="error__code">{{ code }}</div>
<div class="error__title">{{ title }}</div>
{{{ link }}}
`;

export type ErrorPageProps = {
  code: number;
  title: string;
  linkTitle: string;
  linkUrl: RouterPaths
};

export class ErrorPage extends Block<ErrorPageProps>{
  constructor(props: ErrorPageProps) {
    const { linkTitle, linkUrl } = props;
    const link = new Link({ title: linkTitle, url: linkUrl });

    super({ ...props, children: { link }, attributes: { class: 'error' }}, errorTemplate);
  }
}

