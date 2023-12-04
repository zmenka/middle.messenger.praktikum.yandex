import { Block } from './block/block.ts';
import modalError, { ModalError } from './components/modal-error/modal-error.ts';
import { indexPage, IndexPage } from './pages/index/index.ts';
import { SignInPage} from './pages/sign-in/sign-in.ts';
import { SignUpPage} from './pages/sign-up/sign-up.ts';
import { ProfilePage} from './pages/profile/profile.ts';
import { ChatSettingsPage} from './pages/chat-settings/chat-settings.ts';
import { ChatsPage} from './pages/chats/chats.ts';
import { ErrorPage, ErrorPageProps} from './layouts/error/error.ts';
import { render } from './services/render';
import router, { RouterPaths } from './services/router.ts';

render(modalError, '.modal-error', true);

router
  .use(RouterPaths.SignUp, SignUpPage)
  .use(RouterPaths.SignIn, SignInPage)
  .use(RouterPaths.Chats, ChatsPage)
  .use(RouterPaths.ChatSettings, ChatSettingsPage)
  .use(RouterPaths.Profile, ProfilePage)
  .start();



  // setTimeout(() => {
  //   router.go("/test");
  // }, 2000);

// switch (true) {
//   case currentPathname.includes('sign-in'):
//     render(signInPage);
//     break;
//   case currentPathname.includes('sign-up'):
//     render(signUpPage);
//     break;
//   case currentPathname.includes('profile'):
//     render(propfilePage);
//     break;
//   case currentPathname.includes('chats'):
//     render(chatsPage);
//     break;
//   case currentPathname.includes('404'):
//     render(new ErrorPage({ code: 404, title: 'Oops, Page not found', linkTitle: 'Go back', linkUrl: '/'}));
//     break;
//   case currentPathname.includes('500'):
//     render(new ErrorPage({ code: 500, title: 'Oops, something went wrong', linkTitle: 'Go back', linkUrl: '/'}));
//     break;
//   default:
//     render(indexPage);
// }

