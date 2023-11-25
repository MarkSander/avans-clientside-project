export interface ISet {
  id: string;
  title: string;
  type: string;
  rarity: string;
  legendary: boolean;
  manacost: number;
}

export type ICreateSet = Pick<
  ISet,
  'title' | 'type' | 'rarity' | 'legendary' | 'manacost'
  // | 'sort' | 'cook'
>;
export type IUpdateSet = Partial<Omit<ISet, 'id'>>;
export type IUpsertSet = ISet;
