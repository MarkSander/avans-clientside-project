import {
  ICreateUser,
  IUpdateUser,
  UserRole,
} from '@avans-nx-workshop/shared/api';
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

  @IsNotEmpty()
  role: UserRole = UserRole.Visitor;
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

  @IsNotEmpty()
  role!: UserRole;
}
