export enum DeckFormat {
  Modern = 'Modern',
  Legacy = 'Legacy',
  Edh = 'Commander',
  Standard = 'Standard',
  Planechase = 'Planechase',
  Vintage = 'Vintage',
  Oathbreaker = 'Oathbreaker',
  Brawl = 'Brawl',
  Pauper = 'Pauper',
  TwoHeadedGiant = 'Two-Headed Giant',
  Historic = 'Historic',
  Alchemy = 'Alchemy',
  Pioneer = 'Pioneer',
}

import { ICard } from './card.interface';
import { Id } from './user.interface';

export interface IDeck {
  _id: Id;
  name: string;
  format: DeckFormat;
  userId: string;
  cards: ICard[];
}

export type ICreateDeck = Pick<IDeck, 'name' | 'format' | 'userId'>;
export type IUpdateDeck = Partial<Omit<IDeck, 'id'>>;
export type IUpsertDeck = IDeck;
