import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from '@avans-nx-workshop/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-project/backend/dto';
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

  @Put(':id')
  put(
    @Param('id') id: string,
    @Body() data: UpdateUserDto
  ): Promise<User | null> {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Post('login')
  async login(
    @Body() loginData: { email: string; password: string }
  ): Promise<User | null> {
    const { email, password } = loginData;
    return this.userService.checkLogin(email, password);
  }
}
