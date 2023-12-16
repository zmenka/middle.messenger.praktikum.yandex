import { Main } from '../../layouts/main/main.ts';
import { Form, FormProps } from '../../components/form/form.ts';
import { FormFieldProps } from '../../components/form/form-field/form-field.ts';
import { FormFieldImageProps } from '../../components/form/form-field-image/form-field-image.ts';
import { FormFieldGroupProps } from '../../components/form/form-field-group/form-field-group.ts';
import { InputTypes } from '../../components/input/input.ts';
import { ValidationTypes, ValidationInfo } from '../../utils/validation.ts';
import { AuthController } from '../../services/controllers/auth.ts';
import { UserController } from '../../services/controllers/user.ts';
import { ChatController } from '../../services/controllers/chat.ts';
import router, { RouterPaths } from '../../services/router/router.ts';
import { connect } from '../../services/connect/connect.ts';
import store, { State } from '../../services/store/store.ts';
import { getParamFromQuery } from '../../utils/path.ts';

const authController = new AuthController();
const chatController = new ChatController();
const userController = new UserController();

function mapStateToChatSettings({
  selectedChat,
  queryParams,
}: State): Pick<FormProps, 'fields' | 'title'> {
  const fields: (FormFieldImageProps | FormFieldProps | FormFieldGroupProps)[] =
    [
      {
        name: 'avatar',
        currentPath: selectedChat?.avatar,
      },
    ];

  const chatId = getParamFromQuery('chatId', 'number', queryParams);

  if (!chatId) {
    fields.push({
      title: 'Title',
      name: 'title',
      type: InputTypes.TEXT,
      error: ValidationInfo[ValidationTypes.MESSAGE].error,
      isError: false,
      validationType: ValidationTypes.MESSAGE,
      value: selectedChat?.title,
    });
  }

  fields.push({
    title: 'Users',
    name: 'users',
    options: (selectedChat?.users || []).map(
      ({ id, first_name, second_name }) => ({
        title: `${first_name} ${second_name}`,
        id,
      })
    ),
    onSearch: (search: string) => {
      return userController.search(search).then((users) => {
        return users.map(({ id, first_name, second_name }) => ({
          title: `${first_name} ${second_name}`,
          id,
        }));
      });
    },
  });

  return {
    fields,
    title: `Settings for chat ${
      selectedChat?.title ? selectedChat?.title.toUpperCase() : ''
    }`,
  };
}

export const ChatSettingsForm = connect(Form, mapStateToChatSettings);

const setSelectedChat = (chatId: number): boolean => {
  const { chatsMap = {} } = store.getState();
  const selectedChat = chatsMap[chatId];

  if (!selectedChat) {
    return false;
  }

  store.set('selectedChat', { ...selectedChat });
  return true;
};

export const ChatSettingsPage = () => {
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
        router.go(RouterPaths.ChatSettings);
        return;
      }

      return chatController.getUsers(chatId);
    })
    .catch((err) => {
      console.log(err);
    });

  return new Main({
    children: new ChatSettingsForm({
      button: {
        title: 'Save',
      },
      onSubmit: (data: any) => {
        const { selectedChat } = store.getState();
        let apiRequest: Promise<any>;

        if (!selectedChat?.id) {
          apiRequest = chatController.create(data.title);
        } else {
          apiRequest = Promise.resolve(selectedChat.id);
        }
        return apiRequest
          .then((chatId) => {
            if (data.avatar) {
              return chatController.changeAvatar(chatId, data.avatar);
            }
            return chatId;
          })
          .then((chatId) => {
            if (data.users && data.users.length) {
              const users = selectedChat?.users || [];

              const addedUsers = data.users.filter(
                (userId: number) => !users.find(({ id }) => id === userId)
              );
              const deletedUsers = users
                .filter(
                  ({ id }) =>
                    !data.users.find((userId: number) => id === userId)
                )
                .map(({ id }) => id);

              const apiRequests: Promise<any>[] = [];
              if (addedUsers.length) {
                apiRequests.push(chatController.setUsers(chatId, addedUsers));
              }

              if (deletedUsers.length) {
                apiRequests.push(
                  chatController.deleteUsers(chatId, deletedUsers)
                );
              }
              return Promise.all(apiRequests);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    }),
  });
};
