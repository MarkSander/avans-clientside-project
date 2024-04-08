import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from '@avans-nx-workshop/shared/api';
import { CreateUserDto } from '@avans-nx-project/backend/dto';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getAll(): Promise<IUser[]> {
    return this.userService.list();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<IUser> {
    return this.userService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.createUser(data);
  }
}
