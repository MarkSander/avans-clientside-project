//import { Id } from './id.type';
/* export enum DeckSort {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Other = 'Other',
} */

// Voor nu is onze user een string; later zullen we hier een User object van maken.
//type User = string;

export interface IDeck {
  id: string;
  title: string;
  type: string;
  rarity: string;
  legendary: boolean;
  manacost: number;
  //sort: MealSort;
  // Naam van de persoon die de maaltijd aanmaakt en kookt.
  //cook: User;
}

export type ICreateDeck = Pick<
  IDeck,
  'title' | 'type' | 'rarity' | 'legendary' | 'manacost'
  // | 'sort' | 'cook'
>;
export type IUpdateDeck = Partial<Omit<IDeck, 'id'>>;
export type IUpsertDeck = IDeck;
