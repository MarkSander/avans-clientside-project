import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';
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
  rarity!: string;

  @IsBoolean()
  @IsNotEmpty()
  legendary!: boolean;

  @IsNumber()
  @IsNotEmpty()
  manacost!: number;
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
  type!: string;

  @IsString()
  @IsNotEmpty()
  rarity!: string;

  @IsBoolean()
  @IsNotEmpty()
  legendary!: boolean;

  @IsNumber()
  @IsNotEmpty()
  manacost!: number;
}

export class UpdateDeckDto implements IUpdateDeck {
  @IsString()
  @IsOptional()
  title!: string;

  @IsString()
  @IsOptional()
  type!: string;

  @IsBoolean()
  @IsOptional()
  legendary!: boolean;
}
