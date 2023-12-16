import { Form } from '../../components/form/form.ts';
import { InputTypes } from '../../components/input/input.ts';
import { ValidationTypes, ValidationInfo } from '../../utils/validation.ts';
import { AuthController } from '../../services/controllers/auth.ts';
import { RouterPaths } from '../../services/router/router.ts';
import './sign-in.css';

const authController = new AuthController();

export const SignInPage = () =>
  new Form({
    title: 'Sign In',
    button: {
      title: 'Sign In',
    },
    link: {
      url: RouterPaths.SignUp,
      title: 'Sign Up',
    },
    fields: [
      {
        title: 'Login',
        name: 'login',
        type: InputTypes.TEXT,
        error: ValidationInfo[ValidationTypes.LOGIN].error,
        isError: false,
        validationType: ValidationTypes.LOGIN,
      },
      {
        title: 'Password',
        name: 'password',
        type: InputTypes.PASSWORD,
        error: ValidationInfo[ValidationTypes.PASSWORD].error,
        isError: false,
        validationType: ValidationTypes.PASSWORD,
      },
    ],
    withBorder: true,
    className: 'sign-in-page',
    onSubmit: (data: any) => {
      authController.tryLogout().then(() => authController.signIn(data));
    },
  });
