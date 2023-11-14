import { Form } from '../../components/form/form.ts';
import { InputTypes } from '../../components/input/input.ts';
import { ValidationTypes, ValidationInfo } from '../../services/validation.ts';

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
      error: ValidationInfo[ValidationTypes.LOGIN].error,
      isError: false,
      validationType: ValidationTypes.LOGIN
    },
    {
      title: 'Password',
      name: 'password',
      type: InputTypes.PASSWORD,
      error: ValidationInfo[ValidationTypes.PASSWORD].error,
      isError: false,
      validationType: ValidationTypes.PASSWORD
    }
  ],
  withBorder: true
});

