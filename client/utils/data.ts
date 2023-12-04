import e from "express";

export type Indexed<T = unknown> = {
  [key in string]: T;
};

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export type UserInfo = Omit<User, 'id' | 'avatar'>;

export type SignUpUser = Omit<User, 'id' | 'dispalay_name' | 'avatar'> & {
  password: string;
}

export type SignInUser = {
  login: string;
  password: string;
}

export type Chat = {
  id: 123;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string
    };
    time: string;
    content: string
  } | null,
  users?: ChatUser[],

}

export type ChatMessage = {
  id: number;
  content: string;
  time: string;
  type: string;
  user_id: number;
  chat_id: number;
}

export type ChatMessageView = {
  isAuthor: boolean;
  avatar: string;
  author: string;
  message: string;
  date: string;
}

export type ChatUser = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  avatar: string | null,
  role: string
}
