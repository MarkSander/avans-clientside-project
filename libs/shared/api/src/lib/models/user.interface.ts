//import { IDeck } from './deck.interface';

export type Id = string;

export interface IUser {
  _id: Id;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  token?: string;
  role: string;
  //decks: IDeck[];
}

export interface IAuthUser {
  _id: Id;
  username: string;
  email: string;
  token?: string;
}

export enum UserRole {
  Admin = 'Admin',
  Visitor = 'Visitor',
  Editor = 'Editor',
}

export type ICreateUser = Pick<
  IUser,
  'username' | 'email' | 'password' | 'createdAt' | 'role'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
