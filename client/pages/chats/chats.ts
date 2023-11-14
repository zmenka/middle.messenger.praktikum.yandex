import { Main } from '../../layouts/main/main.ts';
import { Block } from '../../block/block.ts';
import { IconTypes } from '../../components/icon/icon-resourses.ts';
import { Form } from '../../components/form/form.ts'
import { FormFieldImageProps } from '../../components/form/form-field-image/form-field-image.ts'
import { InputField } from '../../components/input-field/input-field.ts'
import { ValidationTypes } from '../../services/validation.ts'
import { ChatProps, Chat } from '../../components/chats/chat/chat.ts';
import { ChatsProps, Chats } from '../../components/chats/chats.ts';
import { SelectedChatProps } from '../../components/chats/selected-chat/selected-chat.ts';
import data from './data.json';

const onChatSelect = (chatId: string) => {
	const chat = data.chats.find(({ id }) => id===chatId);
	data.history[chatId];
	return {
		author: chat?.author,
		history: data.history[chatId],
		isGroupChat: chat?.isGroupChat
	} as SelectedChatProps;
}

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
