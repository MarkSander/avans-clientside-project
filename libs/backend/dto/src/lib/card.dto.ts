import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsDate,
} from 'class-validator';
import {
  CardRarity,
  CardTypes,
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
  type!: CardTypes;

  @IsString()
  @IsNotEmpty()
  rarity!: CardRarity;

  @IsBoolean()
  @IsNotEmpty()
  foil!: boolean;

  @IsNumber()
  @IsNotEmpty()
  manacost!: number;

  @IsDate()
  @IsNotEmpty()
  releasedate!: Date;

  @IsString()
  @IsNotEmpty()
  setId!: string;

  @IsString()
  image!: string;
}

export class UpsertCardDto implements IUpsertCard {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  _id!: string;

  @IsString()
  @IsNotEmpty()
  type!: CardTypes;

  @IsString()
  @IsNotEmpty()
  rarity!: CardRarity;

  @IsBoolean()
  @IsNotEmpty()
  foil!: boolean;

  @IsNumber()
  @IsNotEmpty()
  manacost!: number;

  @IsDate()
  @IsNotEmpty()
  releasedate!: Date;

  image!: string;
}

export class UpdateCardDto implements IUpdateCard {
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  type!: CardTypes;

  @IsString()
  @IsNotEmpty()
  rarity!: CardRarity;

  @IsBoolean()
  @IsNotEmpty()
  foil!: boolean;

  @IsNumber()
  @IsNotEmpty()
  manacost!: number;

  @IsDate()
  @IsNotEmpty()
  releasedate!: Date;
}
