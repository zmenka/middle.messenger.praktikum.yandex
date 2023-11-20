import { Block } from '../../block/block.ts';

const indexTemplate = `
<h1>List of pages</h1>
<nav>
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

class IndexPage extends Block<Record<string, any>> {

  constructor() {
    super("div");
  }

  render() {
    return this.compile(indexTemplate);
  }
}

export const indexPage = new IndexPage();
