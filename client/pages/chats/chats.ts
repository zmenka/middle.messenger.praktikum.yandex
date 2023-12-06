import { Main } from '../../layouts/main/main.ts';
import { ConnectedChats } from '../../components/chats/chats.ts';
import { ChatController } from '../../services/controllers/chat.ts';
import { AuthController } from '../../services/controllers/auth.ts';
import store from '../../services/store.ts';
import router, { RouterPaths } from '../../services/router.ts';
import { getParamFromQuery } from '../../utils/path.ts';

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
};

export const ChatsPage = () => {
  store.set('selectedChat', null);
  authController
    .user()
    .then(() => chatController.list())
    .then(() => {
      const chatId = getParamFromQuery(
        'chatId',
        'number',
        store.getState().queryParams
      ) as number | undefined;

      if (!chatId || !setSelectedChat(chatId)) {
        router.go(RouterPaths.Chats);
        return;
      }

      return chatController.getUsers(chatId);
    })
    .catch((err) => {
      console.log(err);
    });

  return new Main({
    children: new ConnectedChats({
      onChatSelect: (chatId: number) => {
        router.go(RouterPaths.Chats,  { chatId });
      },
      onPathChanged: (chatId?: number) => {
        store.set('selectedChat', null);

        if (chatId) {
          setSelectedChat(chatId);

          router.go(RouterPaths.Chats, { chatId });

          chatController.getUsers(chatId);
        }
      },
    }),
  });
};
