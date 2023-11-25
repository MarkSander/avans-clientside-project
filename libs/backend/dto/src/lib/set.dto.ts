import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';
import {
  ICreateSet,
  IUpdateSet,
  IUpsertSet,
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateSetDto implements ICreateSet {
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

export class UpsertSetDto implements IUpsertSet {
  @IsString()
  @IsNotEmpty()
  _id!: string;

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

export class UpdateSetDto implements IUpdateSet {
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
