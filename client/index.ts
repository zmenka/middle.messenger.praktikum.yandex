import modalError from './components/modal-error/modal-error.ts';
import { SignInPage } from './pages/sign-in/sign-in.ts';
import { SignUpPage } from './pages/sign-up/sign-up.ts';
import { ProfilePage } from './pages/profile/profile.ts';
import { ChatSettingsPage } from './pages/chat-settings/chat-settings.ts';
import { ChatsPage } from './pages/chats/chats.ts';
import { render } from './services/render.ts';
import router, { RouterPaths } from './services/router/router.ts';

render(modalError, '.modal-error', true);

router
  .use(RouterPaths.SignUp, SignUpPage)
  .use(RouterPaths.SignIn, SignInPage)
  .use(RouterPaths.Chats, ChatsPage)
  .use(RouterPaths.ChatSettings, ChatSettingsPage)
  .use(RouterPaths.Profile, ProfilePage)
  .start();
