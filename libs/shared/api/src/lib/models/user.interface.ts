export type Id = string;

export interface IUser {
  _id: Id;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export enum UserRole {
  Admin = 'Admin',
  Visitor = 'Visitor',
}

export type ICreateUser = Pick<
  IUser,
  'username' | 'email' | 'password' | 'createdAt'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
