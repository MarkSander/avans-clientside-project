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
  title: string;
  cards: string;
  //sort: MealSort;
  // Naam van de persoon die de maaltijd aanmaakt en kookt.
  //cook: User;
}

export type ICreateSet = Pick<
  ISet,
  'title' | 'cards'
  // | 'sort' | 'cook'
>;
export type IUpdateSet = Partial<Omit<ISet, 'id'>>;
export type IUpsertSet = ISet;
