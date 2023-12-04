import { BaseApi } from './base';
import { Chat, ChatUser } from '../../utils/data';

class ChatApi extends BaseApi {
  constructor() {
    super('/chats/');
  }

  list(offset: number = 0, limit: number = 100, title: string = '') {
    return this.httpTransport
      .get('', { queryParams: { offset, limit, title } })
      .then((data: unknown) => data as Chat[]);
  }

  create(title: string) {
    return this.httpTransport
      .post('', { body: { title } })
      .then((data: unknown) => data as { id: number })
      .then(({ id }) => id);
  }

  getUsers(chatId: number) {
    return this.httpTransport
      .get(`${chatId}/users/`)
      .then((data: unknown) => data as ChatUser[]);
  }

  setUsers(chatId: number, userIds: number[]) {
    return this.httpTransport.put('users/', {
      body: { chatId, users: userIds },
    });
  }

  deleteUsers(chatId: number, userIds: number[]) {
    return this.httpTransport.delete('users/', {
      body: { chatId, users: userIds },
    });
  }

  changeAvatar(chatId: number, data: FormData) {
    data.append('chatId', chatId.toString());

    return this.httpTransport
      .put('avatar', { body: data })
      .then((data: unknown) => data as Chat);
  }

  token(chatId: number) {
    return this.httpTransport
      .post('token/' + chatId)
      .then((data: unknown) => data as { token: string })
      .then(({ token }) => token);
  }
}

export default new ChatApi();
