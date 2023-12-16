import { Block } from '../../../block/block.ts';
import { IconTypes } from '../../../components/icon/icon-resourses.ts';
import { InputField } from '../../../components/input-field/input-field.ts';
import { Link } from '../../link/link.ts';
import { RouterPaths } from '../../../services/router/router.ts';
import { connect } from '../../../services/connect/connect.ts';
import { State } from '../../../services/store/store.ts';
import { WS } from '../../../services/ws.ts';
import { ChatController } from '../../../services/controllers/chat.ts';
import { getFullImgPath } from '../../../utils/path.ts';
import { ChatMessage, ChatMessageView, ChatUser } from '../../../utils/data.ts';
import { getParamFromQuery } from '../../../utils/path.ts';

import './selected-chat.css';

const chatController = new ChatController();

export type SelectedChatProps = {
  userId?: number;
  id?: number;
  title?: string;
  avatar?: string | null;
  users?: ChatUser[];
  history: {
    date: string;
    messages: ChatMessageView[];
  }[];
  notSelected: boolean;
  readyToConnect: boolean;
};

const chatTemplate = `
{{#if notSelected}}
	<h1 class="selected-chat__empty">Choose the chat</h1>
{{else}}
	<div class="selected-chat__header">
    <div class="selected-chat__avatar-cover" >
      {{#if avatar}}
        <img class="selected-chat__avatar" src="{{ avatar }}"/>
      {{/if}}
    </div>
		<div class="chat-list__author">{{ title }}</div>
		{{{ changeLink }}}
	</div>
	<div class="selected-chat__msgs" id="selected-chat-scroller">
			{{#each history }}
					<div class="selected-chat__day">{{ date }}</div>
					{{#each messages }}
              <div class="selected-chat__item {{#if isAuthor}} selected-chat__item_left {{/if}}">
								<div class="selected-chat__msg">{{ message }}</div>
                  {{#if isAuthor}}
                    <div class="selected-chat__caption">({{ date }})</div>
                  {{else}}
                    <div class="selected-chat__caption">{{ author }} ({{ date }})</div>
                  {{/if}}
							  </div>
					{{/each}}
			{{/each}}
	</div>
	<div class="selected-chat__new-msg">
		{{{ msgInput }}}
	</div>
{{/if}}
`;

export class SelectedChat extends Block<SelectedChatProps> {
  _ws: WS | null = null;

  constructor(props: SelectedChatProps) {
    const msgInput = new InputField({
      name: 'message',
      iconType: IconTypes.ENTER,
      onChange: (value: string) => {
        if (this._ws) {
          this._ws.sendMessage(value);
        }
        (this.children.msgInput as InputField).setValue('');
      },
    });

    super(
      {
        ...props,
        children: { msgInput },
        attributes: { class: 'selected-chat' },
      },
      chatTemplate
    );
  }

  getChildrenFromNewProps(props: SelectedChatProps) {
    const { id } = props;

    const changeLink = new Link({
      title: 'Change chat',
      url: RouterPaths.ChatSettings,
      params: id ? { chatId: id.toString() } : undefined,
    });

    return { changeLink };
  }

  stateChangeCallback() {
    const { id, userId, readyToConnect } = this.props;
    if (!readyToConnect || !id || !userId) {
      return;
    }

    return chatController.token(id).then((token) => {
      if (this._ws) {
        this._ws.close();
      }
      this._ws = new WS(userId, id, token);

      this._ws.on(WS.EVENTS.MESSAGE, (data: ChatMessage | ChatMessage[]) => {
        if (!Array.isArray(data)) {
          data = [data];
        }
        const { users, userId } = this.props;
        const history = this.props.history.slice();
        data.reverse().map(({ time, content, user_id }: ChatMessage) => {
          const date = new Date(time).toLocaleDateString();
          const msgDate = new Date(time).toLocaleTimeString();
          // const dateStr = `${date.getDate()} ${date.getMonth()}.${date.getFullYear()}`;
          const user = users?.find(({ id }) => id === user_id);
          const avatar = getFullImgPath(user?.avatar);
          const author = user
            ? `${user.first_name} ${user.second_name}`
            : user_id.toString();
          const isAuthor = user_id === userId;

          const message = {
            isAuthor,
            avatar,
            author,
            message: content,
            date: msgDate,
          };

          if (history.length && history[history.length - 1].date === date) {
            history[history.length - 1].messages.push(message);
          } else {
            history.push({
              date,
              messages: [message],
            });
          }
        });

        this.setPropsAndChildren({ history });

        const div = document.getElementById('selected-chat-scroller');
        div?.scrollTo({
          top: div.scrollHeight,
          behavior: 'smooth',
        });
      });

      return this._ws.connect().then(() => {
        this._ws?.requestMessages();
      });
    });
  }
}

function mapStateToProps({
  selectedChat,
  user,
  queryParams,
}: State): SelectedChatProps {
  const currentChatId = getParamFromQuery('chatId', 'number', queryParams) as
    | number
    | undefined;

  return {
    userId: user?.id,
    notSelected: !selectedChat,
    id: selectedChat?.id,
    title: selectedChat?.title,
    avatar: getFullImgPath(selectedChat?.avatar),
    users: selectedChat?.users,
    history: [],
    readyToConnect:
      !!user?.id &&
      !!selectedChat?.id &&
      !!selectedChat?.users &&
      currentChatId === selectedChat?.id,
  };
}

export const ConnectedSelectedChat = connect(SelectedChat, mapStateToProps);
