import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
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
  title!: string;

  @IsString()
  @IsNotEmpty()
  cards!: string;
}

export class UpsertSetDto implements IUpsertSet {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  _id!: string;

  @IsString()
  @IsNotEmpty()
  cards!: string;
}

export class UpdateSetDto implements IUpdateSet {
  @IsString()
  @IsOptional()
  title!: string;

  @IsString()
  @IsOptional()
  type!: string;

  @IsString()
  @IsOptional()
  cards!: string;
}
