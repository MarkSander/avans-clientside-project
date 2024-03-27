import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import {
  ICreateSet,
  IUpdateSet,
  IUpsertSet,
  /*   CardSort, */
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateSetDto implements ICreateSet {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  releasedate!: Date;

  @IsNumber()
  @IsNotEmpty()
  cardsinset!: number;

  @IsString()
  @IsNotEmpty()
  setcode!: string;
}

export class UpsertSetDto implements IUpsertSet {
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  releasedate!: Date;

  @IsNumber()
  @IsNotEmpty()
  cardsinset!: number;

  @IsString()
  @IsNotEmpty()
  setcode!: string;
}

export class UpdateSetDto implements IUpdateSet {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsNotEmpty()
  releasedate!: Date;

  @IsNumber()
  @IsNotEmpty()
  cardsinset!: number;

  @IsString()
  @IsNotEmpty()
  setcode!: string;
}
