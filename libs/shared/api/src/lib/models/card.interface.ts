//import { Id } from './id.type';

import { Id } from './user.interface';

export interface ICard {
  _id: Id;
  title: string;
  type: string;
  rarity: string;
  foil: boolean;
  manacost: number;
  releasedate: Date;
}

export type ICreateCard = Pick<
  ICard,
  'title' | 'type' | 'rarity' | 'foil' | 'manacost' | 'releasedate'
>;
export type IUpdateCard = Partial<Omit<ICard, 'id'>>;
export type IUpsertCard = ICard;
