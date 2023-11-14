import { Form } from '../../components/form/form.ts'
import { InputTypes } from '../../components/input/input.ts'
import { ValidationTypes } from '../../services/validation.ts'

export const signInPage = new Form({
	title: 'Sign In',
	button: {
		title: 'Sign In',
	},
	link: {
		url: '/sign-up',
		title: 'Sign Up'
	},
	fields: [
		{
			title: 'Login',
			name: 'login',
			type: InputTypes.TEXT,
			error: 'Wrong login',
			isError: false,
			validateType: ValidationTypes.LOGIN
		},
		{
			title: 'Password',
			name: 'password',
			type: InputTypes.PASSWORD,
			error: 'Wrong password',
			isError: false,
			validateType: ValidationTypes.PASSWORD
		}
	],
	withBorder: true
});

