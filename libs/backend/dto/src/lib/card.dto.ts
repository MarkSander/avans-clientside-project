import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';
import {
  ICreateCard,
  IUpdateCard,
  IUpsertCard,
  /*   CardSort, */
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateCardDto implements ICreateCard {
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

export class UpsertCardDto implements IUpsertCard {
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

export class UpdateCardDto implements IUpdateCard {
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
