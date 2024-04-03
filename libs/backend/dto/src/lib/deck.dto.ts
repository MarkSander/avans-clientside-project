import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import {
  DeckFormat,
  ICard,
  ICreateDeck,
  IUpdateDeck,
  IUpsertDeck,
  /*   DeckSort, */
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateDeckDto implements ICreateDeck {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  format!: DeckFormat;

  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  cards!: ICard[];
}

export class UpsertDeckDto implements IUpsertDeck {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  _id!: string;

  @IsNotEmpty()
  format!: DeckFormat;

  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  cards!: ICard[];
}

export class UpdateDeckDto implements IUpdateDeck {
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @IsString()
  @IsOptional()
  name!: string;

  @IsOptional()
  format!: DeckFormat;
}
