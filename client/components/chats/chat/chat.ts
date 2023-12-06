import { Block } from '../../../block/block.ts';
import { getFullImgPath } from '../../../utils/path.ts';
import './chat.css';

export type ChatProps = {
  id: number;
  title: string;
  avatar: string | null;
  unreadCount: number;
  lastMessage: string | null;
  selected: boolean;
  onSelect: (chatId: number) => void;
};

const chatTemplate = `
<div class="chat-item__title">
    <div class="chat-item__avatar-cover" >
      {{#if avatar}}
        <img class="chat-item__avatar" src="{{ avatar }}" width="90" height="90"/>
      {{/if}}
    </div>
		<div class="chat-item__author">{{ title }}</div>
		{{#if unreadCount}}
				<span class="chat-item__new-msg-count">{{ unreadCount }}</span>
		{{/if}}
</div>
<p class="chat-item__msg">{{ lastMessage }}</p>
`;

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    const { avatar, selected } = props;
    const avatarPath = getFullImgPath(avatar);
    super(
      {
        ...props,
        avatar: avatarPath,
        attributes: {
          class: `chat-item ${selected ? 'chat-item_selected' : ''}`,
        },
        events: {
          click: (event) => {
            event.preventDefault();
            props.onSelect(this.props.id);
          },
        },
      },
      chatTemplate
    );
  }
}
