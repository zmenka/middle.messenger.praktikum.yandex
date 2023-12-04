import { BaseApi } from './base';
import { User, UserInfo } from '../../utils/data';

class UserApi extends BaseApi {
  constructor() {
    super('/user/');
  }

  changeInfo(data: UserInfo) {
    return this.httpTransport
      .put('profile', { body: data })
      .then((data: unknown) => data as User);
  }

  changeAvatar(data: FormData) {
    return this.httpTransport
      .put('profile/avatar', { body: data })
      .then((data: unknown) => data as User);
  }

  changePassword(data: { oldPassword: string; newPassword: string }) {
    return this.httpTransport.put('password', { body: data });
  }

  search(data: { login: string }) {
    return this.httpTransport
      .post('search', { body: data })
      .then((data: unknown) => data as User[]);
  }
}

export default new UserApi();
