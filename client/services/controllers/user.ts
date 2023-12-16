import store from '../store/store.ts';
import UserApi from '../api/user.ts';
import { catchPromiseWithModalError } from './base.ts';
import { UserInfo } from '../../utils/data.ts';
import { isEqual } from '../../utils/is-equal.ts';

export class UserController {
  @catchPromiseWithModalError
  public changeInfo(newUser: UserInfo) {
    const user = store.getState().user;
    if (!user) {
      throw new Error('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, avatar, ...userInfo } = user || {};

    if (isEqual(newUser, userInfo)) {
      return Promise.resolve(user);
    }

    return UserApi.changeInfo(newUser).then((user) => {
      store.set('user', user);
      return user;
    });
  }

  @catchPromiseWithModalError
  public changeAvatar(file: FormData) {
    return UserApi.changeAvatar(file).then((user) => {
      store.set('user', user);
      return user;
    });
  }

  @catchPromiseWithModalError
  public changePassword(data: { oldPassword: string; newPassword: string }) {
    return UserApi.changePassword(data);
  }

  @catchPromiseWithModalError
  public search(login: string) {
    return UserApi.search({ login });
  }
}
