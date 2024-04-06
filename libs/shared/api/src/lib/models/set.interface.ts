import { Id } from './user.interface';

export interface ISet {
  _id: Id;
  name: string;
  releasedate: Date;
  cardsinset: number;
  setcode: string;
}

export type ICreateSet = Pick<
  ISet,
  'name' | 'releasedate' | 'cardsinset' | 'setcode'
>;
export type IUpdateSet = Partial<Omit<ISet, '_id'>>;
export type IUpsertSet = ISet;
