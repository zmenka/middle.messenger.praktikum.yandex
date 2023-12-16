import store from '../store/store.ts';
import ChatApi from '../api/chat.ts';
import { catchPromiseWithModalError } from './base.ts';
import { Chat } from '../../utils/data.ts';
import router, { RouterPaths } from '../router/router.ts';

export class ChatController {
  @catchPromiseWithModalError
  public list() {
    return ChatApi.list().then((chats) => {
      const orders: number[] = [];
      const chatsMap: Record<number, Chat> = {};

      chats.forEach((chat) => {
        orders.push(chat.id);
        chatsMap[chat.id] = chat;
      });

      store.set('chatsMap', chatsMap);
      store.set('chatsOrder', orders);
    });
  }

  @catchPromiseWithModalError
  public create(title: string) {
    return ChatApi.create(title).then((id) => {
      store.set('selectedChat.id', id);
      store.set('selectedChat.title', title);
      router.go(RouterPaths.ChatSettings, { chatId: id });
      return id;
    });
  }

  @catchPromiseWithModalError
  public getUsers(chatId: number) {
    return ChatApi.getUsers(chatId).then((users) => {
      store.set('selectedChat.users', users);
    });
  }

  @catchPromiseWithModalError
  public setUsers(chatId: number, userIds: number[]) {
    return ChatApi.setUsers(chatId, userIds).then(() => this.getUsers(chatId));
  }

  @catchPromiseWithModalError
  public deleteUsers(chatId: number, userIds: number[]) {
    return ChatApi.deleteUsers(chatId, userIds);
  }

  @catchPromiseWithModalError
  public changeAvatar(chatId: number, data: FormData) {
    return ChatApi.changeAvatar(chatId, data).then((chat) => {
      store.set('selectedChat', chat);
      return chat.id;
    });
  }

  @catchPromiseWithModalError
  public token(chatId: number) {
    return ChatApi.token(chatId);
  }
}
