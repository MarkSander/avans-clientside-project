import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import {
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
  title!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  set!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;
}

export class UpsertDeckDto implements IUpsertDeck {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  set!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;
}

export class UpdateDeckDto implements IUpdateDeck {
  @IsString()
  @IsOptional()
  title!: string;

  @IsNumber()
  @IsOptional()
  price!: number;
}
