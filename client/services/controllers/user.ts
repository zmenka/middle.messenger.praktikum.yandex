import store from '../store';
import UserApi from '../api/user';
import { catchPromiseWithModalError } from './base';
import { UserInfo } from '../../utils/data';
import { isEqual } from '../../utils/is-equal';

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
