import { Main } from '../../layouts/main/main.ts';
import { IconTypes } from '../../components/icon/icon-resourses.ts';
import { Form } from '../../components/form/form.ts'
import { FormFieldImageProps } from '../../components/form/form-field-image/form-field-image.ts'
import { InputTypes } from '../../components/input/input.ts'
import { ValidationTypes } from '../../services/validation.ts'

export const propfilePage = new Main({
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

	content:  new Form({
		title: 'Profile',
		button: {
			title: 'Save',
		},
		link: {
			url: '/',
			title: 'Log out'
		},
		fields: [
			{
				name: 'image',
			},
			{
				title: 'First Name',
				name: 'first_name',
				type: InputTypes.TEXT,
				error: 'Wrong name',
				isError: false,
				validateType: ValidationTypes.NAME
			},
			{
				title: 'Last Name',
				name: 'second_name',
				type: InputTypes.TEXT,
				error: 'Wrong name',
				isError: false,
				validateType: ValidationTypes.NAME
			},
			{
				title: 'Display Name',
				name: 'display_name',
				type: InputTypes.TEXT,
				error: 'Wrong name',
				isError: false,
				validateType: ValidationTypes.NAME
			},
			{
				title: 'Login',
				name: 'login',
				type: InputTypes.TEXT,
				error: 'Wrong login',
				isError: false,
				validateType: ValidationTypes.LOGIN
			},
			{
				title: 'Email',
				name: 'email',
				type: InputTypes.EMAIL,
				error: 'Wrong email',
				isError: false,
				validateType: ValidationTypes.EMAIL
			},
			{
				title: 'Phone',
				name: 'phone',
				type: InputTypes.TEL,
				error: 'Wrong phone',
				isError: false,
				validateType: ValidationTypes.PHONE
			},
			{
				title: 'Old password',
				name: 'old_password',
				type: InputTypes.PASSWORD,
				error: 'Wrong password',
				isError: false,
				validateType: ValidationTypes.PASSWORD
			},
			{
				title: 'New password',
				name: 'new_password',
				type: InputTypes.PASSWORD,
				error: 'Wrong password',
				isError: false,
				validateType: ValidationTypes.PASSWORD
			}
		],
	})
});
