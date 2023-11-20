import { Main } from '../../layouts/main/main.ts';
import { IconTypes } from '../../components/icon/icon-resourses.ts';
import { Form } from '../../components/form/form.ts';
import { InputTypes } from '../../components/input/input.ts';
import { ValidationTypes, ValidationInfo } from '../../services/validation.ts';

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
        title: 'Display Name',
        name: 'display_name',
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
        title: 'Old password',
        name: 'old_password',
        type: InputTypes.PASSWORD,
        error: ValidationInfo[ValidationTypes.PASSWORD].error,
        isError: false,
        validationType: ValidationTypes.PASSWORD
      },
      {
        title: 'New password',
        name: 'new_password',
        type: InputTypes.PASSWORD,
        error: ValidationInfo[ValidationTypes.PASSWORD].error,
        isError: false,
        validationType: ValidationTypes.PASSWORD
      }
    ],
  })
});
