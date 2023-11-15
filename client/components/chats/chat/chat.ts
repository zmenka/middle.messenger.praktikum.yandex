import { Block } from '../../../block/block.ts';
import { Icon } from '../../../components/icon/icon.ts';
import { IconTypes } from '../../../components/icon/icon-resourses.ts';
import './chat.css';

export type ChatProps = {
  id: string;
  author: string;
  lastMessage: string;
  unreadMsgCount: number;
  selected: boolean;
  onSelect: (chatId: string)=>void
};

const chatTemplate = `
<div class="chat-item__title">
		{{{ icon }}}
		<div class="chat-item__author">{{ author }}</div>
		{{#if unreadMsgCount}}
				<span class="chat-item__new-msg-count">{{ unreadMsgCount }}</span>
		{{/if}}
</div>
<p class="chat-item__msg">{{ lastMessage }}</p>
`;

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    const icon = new Icon({
      type: IconTypes.AVATAR,
      className: 'chat-item__avatar'
    });

    super("div", {
      props,
      children: { icon },
      attributes: { 'class': 'chat-item' },
      events: {
        click: event => {
          event.preventDefault();
          props.onSelect(this.props.id);
        },
      }
    });
  }

  render() {
    const { author, lastMessage, unreadMsgCount } = this.props;
    return this.compile(chatTemplate, { author, lastMessage, unreadMsgCount });
  }
}
