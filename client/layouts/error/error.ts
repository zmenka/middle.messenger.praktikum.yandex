import { Block } from '../../block/block.ts'
import { Link } from '../../components/link/link.ts';
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
	linkUrl: string
};

export class ErrorPage extends Block {
  constructor({ code, title, linkTitle, linkUrl }: ErrorPageProps) {
		const link = new Link({ title: linkTitle, url: linkUrl });

    super("div", { props: { code, title }, children: { link }, attributes: { class: 'error' }});
  }

  render() {
		const { code, title } = this.props;
		return this.compile(errorTemplate, { code, title });
  }
}

