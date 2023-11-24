//import { Id } from './id.type';
export type Id = string;
/* export enum CardSort {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Other = 'Other',
} */

// Voor nu is onze user een string; later zullen we hier een User object van maken.
//type User = string;

export interface ICard {
  _id: Id;
  title: string;
  type: string;
  rarity: string;
  legendary: boolean;
  manacost: number;
  //sort: MealSort;
  // Naam van de persoon die de maaltijd aanmaakt en kookt.
  //cook: User;
}

export type ICreateCard = Pick<
  ICard,
  'title' | 'type' | 'rarity' | 'legendary' | 'manacost'
  // | 'sort' | 'cook'
>;
export type IUpdateCard = Partial<Omit<ICard, 'id'>>;
export type IUpsertCard = ICard;
