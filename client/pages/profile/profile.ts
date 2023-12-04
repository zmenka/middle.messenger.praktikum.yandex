import { Main } from '../../layouts/main/main.ts';
import { Form, FormProps } from '../../components/form/form.ts';
import { InputTypes } from '../../components/input/input.ts';
import { ValidationTypes, ValidationInfo } from '../../utils/validation.ts';
import { AuthController } from '../../services/controllers/auth.ts';
import { UserController } from '../../services/controllers/user.ts';
import router, { RouterPaths } from '../../services/router.ts';
import { connect } from '../../services/connect.ts';
import { State } from '../../services/store.ts';

const authController = new AuthController();
const userController = new UserController();

function mapStateToProfile({ user }: State): Pick<FormProps, 'fields'> {
  return {
    fields: [
      {
        name: 'avatar',
        currentPath: user?.avatar,
      },
      {
        title: 'First Name',
        name: 'first_name',
        type: InputTypes.TEXT,
        error: ValidationInfo[ValidationTypes.NAME].error,
        isError: false,
        validationType: ValidationTypes.NAME,
        value: user?.first_name,
      },
      {
        title: 'Last Name',
        name: 'second_name',
        type: InputTypes.TEXT,
        error: ValidationInfo[ValidationTypes.NAME].error,
        isError: false,
        validationType: ValidationTypes.NAME,
        value: user?.second_name,
      },
      {
        title: 'Display Name',
        name: 'display_name',
        type: InputTypes.TEXT,
        error: ValidationInfo[ValidationTypes.NAME].error,
        isError: false,
        validationType: ValidationTypes.NAME,
        value: user?.display_name,
      },
      {
        title: 'Login',
        name: 'login',
        type: InputTypes.TEXT,
        error: ValidationInfo[ValidationTypes.LOGIN].error,
        isError: false,
        validationType: ValidationTypes.LOGIN,
        value: user?.login,
      },
      {
        title: 'Email',
        name: 'email',
        type: InputTypes.EMAIL,
        error: ValidationInfo[ValidationTypes.EMAIL].error,
        isError: false,
        validationType: ValidationTypes.EMAIL,
        value: user?.email,
      },
      {
        title: 'Phone',
        name: 'phone',
        type: InputTypes.TEL,
        error: ValidationInfo[ValidationTypes.PHONE].error,
        isError: false,
        validationType: ValidationTypes.PHONE,
        value: user?.phone,
      },
    ],
  };
}

export const ProfileForm = connect(Form, mapStateToProfile);

export const ProfilePage = () => {
  authController.user();

  return new Main({
    children: [
      new ProfileForm({
        title: 'Profile',
        button: {
          title: 'Save',
        },
        link: {
          title: 'Log out',
          click: () => {
            authController.logout().catch((err) => {
              console.log(err);
            });
          },
        },
        onSubmit: (data: any) => {
          const apiRequests = [];
          if (data.avatar) {
            apiRequests.push(userController.changeAvatar(data.avatar));
          }
          apiRequests.push(
            userController.changeInfo({
              first_name: data.first_name,
              second_name: data.second_name,
              display_name: data.display_name,
              login: data.login,
              email: data.email,
              phone: data.phone,
            })
          );

          Promise.all(apiRequests).catch((err) => {
            console.log(err);
          });
        },
      }),
      new Form({
        title: 'Change password',
        button: {
          title: 'Save',
        },
        fields: [
          {
            title: 'Old password',
            name: 'oldPassword',
            type: InputTypes.PASSWORD,
            error: ValidationInfo[ValidationTypes.PASSWORD].error,
            isError: false,
            validationType: ValidationTypes.PASSWORD,
          },
          {
            title: 'New password',
            name: 'newPassword',
            type: InputTypes.PASSWORD,
            error: ValidationInfo[ValidationTypes.PASSWORD].error,
            isError: false,
            validationType: ValidationTypes.PASSWORD,
          },
        ],
        onSubmit: (data: any) => {
          userController
            .changePassword({
              oldPassword: data.oldPassword,
              newPassword: data.newPassword,
            })
            .then(() => {
              router.go(RouterPaths.Chats);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      }),
    ],
  });
};
