import { Form } from '../../components/form/form.ts'
import { InputTypes } from '../../components/input/input.ts'
import { ValidationTypes } from '../../services/validation.ts'

export const signUpPage = new Form({
	title: 'Sign Up',
	button: {
		title: 'Sign Up',
	},
	link: {
		url: '/sign-in',
		title: 'Sign In'
	},
	fields: [
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

