import store from '../store';
import router, { RouterPaths } from '../router';
import AuthApi from '../api/auth';
import { catchPromiseWithModalError } from './base';

export class AuthController {
  @catchPromiseWithModalError
  public signUp(data: any) {
    return AuthApi.signUp(data).then(() => router.go(RouterPaths.Chats));
  }

  @catchPromiseWithModalError
  public signIn(data: any) {
    return AuthApi.signIn(data).then(() => router.go(RouterPaths.Chats));
  }

  @catchPromiseWithModalError
  public logout() {
    return AuthApi.logout().then(() => router.go(RouterPaths.SignIn));
  }

  public tryLogout() {
    return AuthApi.logout().catch(() => {});
  }

  public user() {
    return AuthApi.user()
      .then((user) => {
        store.set('user', user);
      })
      .catch((err) => {
        router.go(RouterPaths.SignIn);
        throw err;
      });
  }
}
