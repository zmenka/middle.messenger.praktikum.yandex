export enum ValidationTypes {
	NAME = 'NAME',
	LOGIN = 'LOGIN',
	EMAIL = 'EMAIL',
	PASSWORD = 'PASSWORD',
	PHONE = 'PHONE',
	MESSAGE = 'MESSAGE',
};

export type ValidationFunc = {
  (value?: string): boolean;
}

export function getValidateionFunc(type: ValidationTypes): ValidationFunc {
	return (value?: string) => {
		return !!value && ValidationRegexps[type].test(value);
	};
}

const ValidationRegexps = {
	// латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).
	[ValidationTypes.NAME]: /^[A-ZА-Я][a-zа-я]+-?[a-zа-я]+$/,
	// от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов
// (допустимы дефис и нижнее подчёркивание)
	[ValidationTypes.LOGIN]: /^(?=.*[A-Za-z_-])([A-Za-z0-9_-]{3,20})$/,
	// латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания,
// обязательно должна быть «собака» (@) и точка после неё,
// но перед точкой обязательно должны быть буквы.
	[ValidationTypes.EMAIL]: /^[a-z0-9-_]+@[a-z]+\.[a-z]+$/,
	// от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра
	[ValidationTypes.PASSWORD]: /^(?=.*[A-Z])(?=.*[0-9])(.{8,40})$/,
	// от 10 до 15 символов, состоит из цифр, может начинается с плюса
	[ValidationTypes.PHONE]: /^\+?\d{10,15}$/,
	// не пустое
	[ValidationTypes.MESSAGE]: /^.+$/,
}
