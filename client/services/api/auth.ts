import { BaseApi } from './base';
import { SignUpUser, SignInUser, User } from '../../utils/data';

class AuthApi extends BaseApi {
  constructor() {
    super('/auth/');
  }

  signUp(data: SignUpUser) {
    return this.httpTransport
      .post('signup', { body: data })
      .then(({ id }: any) => id);
  }

  signIn(data: SignInUser) {
    return this.httpTransport.post('signin', { body: data });
  }

  logout() {
    return this.httpTransport.post('logout');
  }

  user() {
    return this.httpTransport.get('user').then((data: unknown) => data as User);
  }
}

export default new AuthApi();
