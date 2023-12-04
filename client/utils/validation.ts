export enum ValidationTypes {
  NAME = 'NAME',
  LOGIN = 'LOGIN',
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
  PHONE = 'PHONE',
  MESSAGE = 'MESSAGE',
}

export type ValidationFunc = {
  (value?: string): boolean;
};

export function getValidateionFunc(type: ValidationTypes): ValidationFunc {
  return (value?: string) => {
    return !!value && ValidationInfo[type].regexp.test(value);
  };
}

export const ValidationInfo = {
  // латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).
  [ValidationTypes.NAME]: {
    regexp: /^[A-ZА-Я][a-zа-я]+-?[a-zа-я]+$/,
    error:
      'Name must begin with a capital letter without numbers or special symbols',
  },
  // от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов
  // (допустимы дефис и нижнее подчёркивание)
  [ValidationTypes.LOGIN]: {
    regexp: /^(?=.*[A-Za-z_-])([A-Za-z0-9_-]{3,20})$/,
    error: 'Login must contains between 3 and 20 letters or numbers',
  },
  // латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания,
  // обязательно должна быть «собака» (@) и точка после неё,
  // но перед точкой обязательно должны быть буквы.
  [ValidationTypes.EMAIL]: {
    regexp: /^[a-z0-9-_]+@[a-z]+\.[a-z]+$/,
    error: 'Wrong email',
  },
  // от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра
  [ValidationTypes.PASSWORD]: {
    regexp: /^(?=.*[A-Z])(?=.*[0-9])(.{8,40})$/,
    error:
      'Password must contains between 8 and 40 letters with atleast 1 capital letter and 1 number',
  },
  // от 10 до 15 символов, состоит из цифр, может начинается с плюса
  [ValidationTypes.PHONE]: {
    regexp: /^\+?\d{10,15}$/,
    error: 'Phone must contains between 10 and 15 numbers, can start with +',
  },
  // не пустое
  [ValidationTypes.MESSAGE]: {
    regexp: /^.+$/,
    error: 'Must be non-empty',
  },
};
