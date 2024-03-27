//import { Id } from './id.type';
export type SetId = string;
/* export enum CardSort {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Other = 'Other',
} */

// Voor nu is onze user een string; later zullen we hier een User object van maken.
//type User = string;

export interface ISet {
  _id: SetId;
  name: string;
  releasedate: Date;
  cardsinset: number;
  setcode: string;
}

export type ICreateSet = Pick<
  ISet,
  'name' | 'releasedate' | 'cardsinset' | 'setcode'
>;
export type IUpdateSet = Partial<Omit<ISet, 'id'>>;
export type IUpsertSet = ISet;
