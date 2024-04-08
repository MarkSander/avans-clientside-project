import { ICreateUser, IUpdateUser } from '@avans-nx-workshop/shared/api';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date = new Date();
}

export class UpdateUserDto implements IUpdateUser {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
