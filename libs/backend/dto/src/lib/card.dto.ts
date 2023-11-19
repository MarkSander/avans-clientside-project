import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';
import {
  ICreateCard,
  IUpdateCard,
  IUpsertCard,
  CardSort,
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
  description!: string;

  @IsString()
  @IsNotEmpty()
  sort!: CardSort;

  @IsString()
  @IsNotEmpty()
  cook!: string;
}

export class UpsertCardDto implements IUpsertCard {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsBoolean()
  @IsNotEmpty()
  isVega!: boolean;

  @IsDate()
  @IsNotEmpty()
  dateServed!: Date;

  @IsString()
  @IsNotEmpty()
  sort!: CardSort;

  @IsString()
  @IsNotEmpty()
  cook!: string;
}

export class UpdateCardDto implements IUpdateCard {
  @IsString()
  @IsOptional()
  title!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsBoolean()
  @IsOptional()
  completed!: boolean;
}
