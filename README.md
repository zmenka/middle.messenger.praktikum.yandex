## Описание

Веб-мессенджер в рамках курса от Яндекс Практикума.

## Функциональность

- Реализован роутинг
- К страницам подключено api, а именно:
  - авторизация в полном объеме (регистрация, авторизация, выход из системы);
  - работа с информацией пользователя (изменять данные пользователя, изменять аватар, изменять пароль);
  - работа с чатами (список чатов пользователя, создать новый чат, добавить пользователя в чат, удалить пользователя из чата).

## Макеты проекта в Figma

[ссылка](https://www.figma.com/file/XjLv8558L4Gco0xstb6AAN/practicum-chat-design?type=design&node-id=25%3A741&mode=design&t=Avvfl9MILZkpG9Wp-1)

## Netlify

[домен](https://deploy--marvelous-wisp-9e952a.netlify.app)

## Страницы

- [Sign In](https://deploy--marvelous-wisp-9e952a.netlify.app/)
- [Sign Up](https://deploy--marvelous-wisp-9e952a.netlify.app/sign-up)
- [Страница со списком чатов](https://deploy--marvelous-wisp-9e952a.netlify.app/messenger)
- [Профиль](https://deploy--marvelous-wisp-9e952a.netlify.app/settings)

## Code style

В проекте используются ESLint, Stylelint, EditorConfig и Prettier

## Установка

- `npm install` — установка необходимых пакетов,
- `npm run dev` — запуск версии для разработчика,
- `npm run build` — сборка продовой версии,
- `npm run start` — сборка и запуск продовой версии.
- `npm run lint` — запуск линтеров.
