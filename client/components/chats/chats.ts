import { Block } from '../../block/block.ts';
import { IconTypes } from '../../components/icon/icon-resourses.ts';
import { InputField } from '../../components/input-field/input-field.ts';
import { ChatProps, Chat } from './chat/chat.ts';
import { SelectedChat, SelectedChatProps, ConnectedSelectedChat } from './selected-chat/selected-chat.ts';
import router, { RouterPaths } from '../../services/router.ts'
import { connect } from '../../services/connect.ts';
import { State } from '../../services/store.ts';

import './chats.css';

export type ChatsProps = {
  chats: Omit<ChatProps, "onSelect">[];
  onChatSelect: (chatId: number) => void;
};

const chatsTemplate = `
<div class="chats__panel">
	<ul class="chats__list">
			{{#each chats }}
					<li class="chats__item">
							{{{ this }}}
					</li>
			{{/each}}
	</ul>
</div>
{{{ selectedChat }}}
	`;

export class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    const { chats: chatsProps, onChatSelect } = props;

    const chats = chatsProps.map(chatProps => new Chat({ ...chatProps, onSelect: (chatId: number) => {
      onChatSelect(chatId);
    } }));

    const selectedChat = new ConnectedSelectedChat();

    super({ ...props, children: { chats, selectedChat }, attributes: { 'class': 'chats' }}, chatsTemplate);
  }

  getChildrenFromNewProps(nextProps: Partial<ChatsProps>) {
    if (!nextProps.chats) {
      return {};
    }
    const chats = nextProps.chats.map(chatProps => new Chat({ ...chatProps, onSelect: (chatId: number) => {
      this.props.onChatSelect(chatId);
    } }));

    return { chats };
  }
}


function mapStateToProps({ chatsMap = {}, chatsOrder = [], selectedChat }: State): Omit<ChatsProps, 'onChatSelect'>{
  const selectedChatId = selectedChat?.id;

  return {
    chats: chatsOrder.map(( chatId )=> {
      const { id, title, avatar, unread_count, last_message  } = chatsMap[chatId];

      return {
        id,
        title,
        avatar,
        unreadCount: unread_count,
        lastMessage: last_message?.content || null,
        selected: id === selectedChatId
      }
    })
  };
}

export const ConnectedChats = connect(Chats, mapStateToProps);
