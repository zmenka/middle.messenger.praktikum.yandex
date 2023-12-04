import { Main } from '../../layouts/main/main.ts';
import { IconTypes } from '../../components/icon/icon-resourses.ts';
import { ConnectedChats } from '../../components/chats/chats.ts';
import { Block } from '../../block/block.ts';
import { SelectedChatProps } from '../../components/chats/selected-chat/selected-chat.ts';
import { ChatController } from '../../services/controllers/chat.ts'
import { AuthController } from '../../services/controllers/auth.ts'
import store, { State } from '../../services/store.ts'
import router, { RouterPaths } from '../../services/router.ts'
import { getParams } from '../../utils/path.ts'

const authController = new AuthController();
const chatController = new ChatController();

const setSelectedChat = (chatId: number) => {
  const { chatsMap = {} } = store.getState();
  const selectedChat = chatsMap[chatId];

  if (!selectedChat) {
    return false;
  }

  store.set('selectedChat', { ...selectedChat });
  return true;
}

export const ChatsPage = () => {
  console.log('INIT CHATS PAGE');
  store.set('selectedChat', null);
  authController.user()
    .then(() => chatController.list())
    .then(() => {
      const { currentPath } = store.getState();
      const { chatId } = getParams(RouterPaths.Chats, currentPath);

      const id = parseInt(chatId);

      if (isNaN(id) || !setSelectedChat(id)) {
        router.go(RouterPaths.Chats);
        return;
      }

      return chatController.getUsers(id)
    })
    .catch((err) => {
      console.log('ChatsPage', err);
    });

  return new Main({
    children: new ConnectedChats({
      onChatSelect: (chatId: number) => {
        store.set('selectedChat', null);
        setSelectedChat(chatId);
        chatController.getUsers(chatId);
        router.go(RouterPaths.Chats, { chatId });
      }
    })
  });
}
