import { Form } from '../../components/form/form.ts';
import { InputTypes } from '../../components/input/input.ts';
import { ValidationTypes, ValidationInfo} from '../../services/validation.ts';

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
      error: ValidationInfo[ValidationTypes.NAME].error,
      isError: false,
      validationType: ValidationTypes.NAME
    },
    {
      title: 'Last Name',
      name: 'second_name',
      type: InputTypes.TEXT,
      error: ValidationInfo[ValidationTypes.NAME].error,
      isError: false,
      validationType: ValidationTypes.NAME
    },
    {
      title: 'Login',
      name: 'login',
      type: InputTypes.TEXT,
      error: ValidationInfo[ValidationTypes.LOGIN].error,
      isError: false,
      validationType: ValidationTypes.LOGIN
    },
    {
      title: 'Email',
      name: 'email',
      type: InputTypes.EMAIL,
      error: ValidationInfo[ValidationTypes.EMAIL].error,
      isError: false,
      validationType: ValidationTypes.EMAIL
    },
    {
      title: 'Phone',
      name: 'phone',
      type: InputTypes.TEL,
      error: ValidationInfo[ValidationTypes.PHONE].error,
      isError: false,
      validationType: ValidationTypes.PHONE
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

