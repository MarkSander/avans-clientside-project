//import { Id } from './id.type';

import { Id } from './user.interface';

export enum CardTypes {
  Creature = 'Creature',
  Land = 'Land',
  Enchantment = 'Enchantment',
  Arifact = 'Artifact',
}

export enum CardRarity {
  Mythic = 'Mythic',
  Rare = 'Rare',
  Uncommon = 'Uncommon',
  Common = 'Common',
}

export interface ICard {
  _id: Id;
  title: string;
  type: CardTypes;
  rarity: CardRarity;
  foil: boolean;
  manacost: number;
  releasedate: Date;
  //setId
}

export type ICreateCard = Pick<
  ICard,
  'title' | 'type' | 'rarity' | 'foil' | 'manacost' | 'releasedate'
>;
export type IUpdateCard = Partial<Omit<ICard, 'id'>>;
export type IUpsertCard = ICard;
