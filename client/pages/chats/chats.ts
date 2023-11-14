import { Main } from '../../layouts/main/main.ts';
import { IconTypes } from '../../components/icon/icon-resourses.ts';
import { Chats } from '../../components/chats/chats.ts';
import { SelectedChatProps } from '../../components/chats/selected-chat/selected-chat.ts';
import data from './data.json';

const onChatSelect = (chatId: string) => {
  const chat = data.chats.find(({ id }) => id===chatId);

  return <SelectedChatProps>{
    author: chat?.author,
    history: (data.history as any)[chatId],
    isGroupChat: chat?.isGroupChat
  };
};

export const chatsPage = new Main({
  menus: [
    {
      isActive: true,
      type: IconTypes.AVATAR
    },
    {
      type: IconTypes.CHAT
    },
    {
      type: IconTypes.PLUS
    }
  ],

  content: new Chats({
    chats: data.chats,
    onChatSelect
  })
});
