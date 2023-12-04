import { Block } from '../../block/block.ts';
import { Link} from '../../components/link/link';

const indexTemplate = `
<h1>List of pages</h1>
<nav>
{{{ link }}}
<ul>
    <li>
    <a href="/sign-in">Sign In</a>
    </li>
    <li>
    <a href="/sign-up">Sign Up</a>
    </li>
    <li>
    <a href="/chats">Chats</a>
    </li>
    <li>
    <a href="/profile">Profile</a>
    </li>
    <li>
    <a href="/404">404</a>
    </li>
    <li>
    <a href="/500">500</a>
    </li>
</ul>
</nav>
`;

export class IndexPage extends Block {

  constructor() {
    const link = new Link({
      title: 'test',
      url: '/test'
    });

    super("div", { children: { link }});
  }

  render() {
    return this.compile(indexTemplate);
  }
}

export const indexPage = () => new IndexPage();
