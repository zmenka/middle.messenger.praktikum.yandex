import { indexPage } from './pages/index/index.ts';
import { signInPage} from './pages/sign-in/sign-in.ts';
import { signUpPage} from './pages/sign-up/sign-up.ts';
import { propfilePage} from './pages/profile/profile.ts';
import { chatsPage} from './pages/chats/chats.ts';
import { ErrorPage} from './layouts/error/error.ts';
import { render } from './services/render';

const currentPathname: string = window.location.pathname;

switch (true) {
  case currentPathname.includes('sign-in'):
    render(signInPage);
    break;
  case currentPathname.includes('sign-up'):
    render(signUpPage);
    break;
  case currentPathname.includes('profile'):
    render(propfilePage);
    break;
  case currentPathname.includes('chats'):
    render(chatsPage);
    break;
  case currentPathname.includes('404'):
    render(new ErrorPage({ code: 404, title: 'Oops, Page not found', linkTitle: 'Go back', linkUrl: '/'}));
    break;
  case currentPathname.includes('500'):
    render(new ErrorPage({ code: 500, title: 'Oops, something went wrong', linkTitle: 'Go back', linkUrl: '/'}));
    break;
  default:
    render(indexPage);
}

