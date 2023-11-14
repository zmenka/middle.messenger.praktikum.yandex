import { Block } from '../../block/block.ts';
import { IconTypes } from '../../components/icon/icon-resourses.ts';
import { InputField } from '../../components/input-field/input-field.ts';
import { ChatProps, Chat } from './chat/chat.ts';
import { SelectedChat, SelectedChatProps } from './selected-chat/selected-chat.ts';
import './chats.css';

export type ChatsProps = {
  chats: Omit<ChatProps, "onSelect">[];
  onChatSelect: (chatId: string) => SelectedChatProps
};

const chatsTemplate = `
<div class="chats__panel">
	<div class="chats__search">
			{{{ searchInput }}}
	</div>
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

export class Chats extends Block {
  _searchInput:InputField;
  _chats: Chat[];
  _selectedChat: SelectedChat;

  constructor({ chats: chatsProps, onChatSelect }: ChatsProps) {
    const searchInput = new InputField({
      name: 'search',
      iconType: IconTypes.ENTER
    });

    const chats = chatsProps.map(chatProps => new Chat({ ...chatProps, onSelect: (chatId: string) => {
      return this.onSelect(chatId);
    } }));

    const selectedChat = new SelectedChat();

    super("div", { props: { onChatSelect }, children: { searchInput, chats, selectedChat }, attributes: { 'class': 'chats' }});

    this._searchInput = searchInput;
    this._chats = chats;
    this._selectedChat = selectedChat;
  }

  render() {
    return this.compile(chatsTemplate, {});
  }

  onSelect(chatId: string) {
    const selectedChatProps = this.props.onChatSelect(chatId);
    this._selectedChat.setChatProps(selectedChatProps);
  }
}
