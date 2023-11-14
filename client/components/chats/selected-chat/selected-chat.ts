import { Block } from '../../../block/block.ts';
import { Icon } from '../../../components/icon/icon.ts';
import { IconTypes } from '../../../components/icon/icon-resourses.ts';
import { InputField } from '../../../components/input-field/input-field.ts';
import { Link } from '../../link/link.ts';

import './selected-chat.css';

export type SelectedChatProps = {
  author: string;
  history: {
    date: string;
    messages: {
      date: string;
      message: string;
      author: string;
    }[]
  }[];
  isGroupChat: boolean;
};

const chatTemplate = `
{{#if notSelected}}
	<h1 class="selected-chat__empty">Choose the chat</h1>
{{else}}
	<div class="selected-chat__header">
		{{{ icon }}}
		<div class="chat-list__author">{{ author }}</div>
		{{#if isGroupChat }}
			{{{ changeLink }}}
		{{/if}}
		{{{ deleteLink }}}
	</div>
	<div class="selected-chat__msgs">
			{{#each history }}
					<div class="selected-chat__day">{{ date }}</div>
					{{#each messages }}
						{{#if isGroupChat }}
							<div class="selected-chat__item {{#if author}} selected-chat__item_left {{/if}}">
								{{{ avatar }}}
								<div class="selected-chat__msg">{{ message }}</div>
								<div class="selected-chat__caption">{{ author }} ({{ date }})</div>
							</div>
						{{else}}
							<div class="selected-chat__item {{#if author}} selected-chat__item_left {{/if}}">
								<div class="selected-chat__msg">{{ message }}</div>
								<div class="selected-chat__caption">({{ date }})</div>
							</div>
						{{/if}}
					{{/each}}
			{{/each}}
	</div>
	<div class="selected-chat__new-msg">
		{{{ msgInput }}}
	</div>
{{/if}}
`;

export class SelectedChat extends Block {
  constructor() {
    super("div", { props: { notSelected: true }, attributes: { 'class': 'selected-chat' }});
  }

  render() {
    const { notSelected, author, history, isGroupChat } = this.props;
    return this.compile(chatTemplate, { notSelected, author, history, isGroupChat });
  }

  setChatProps(props: SelectedChatProps) {
    const { author, history, isGroupChat } = props;
    const icon = new Icon({
      type: IconTypes.AVATAR,
      className: 'selected-chat__header-avatar'
    });

    const avatar = new Icon({
      type: IconTypes.AVATAR,
      className: 'selected-chat__avatar'
    });

    const msgInput = new InputField({
      name: 'message',
      iconType: IconTypes.ENTER
    });

    const changeLink = new Link({
      title: 'Change chat',
      url: '/'
    });

    const deleteLink = new Link({
      title: 'Delete chat',
      url: '/'
    });

    this.setProps({
      props: { notSelected: false, author, history, isGroupChat },
      children: { icon, avatar, msgInput, changeLink, deleteLink }
    });
  }
}
