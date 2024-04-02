import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from '@avans-nx-workshop/shared/api';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getAll(): Observable<IUser[]> {
    return this.userService.list();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Observable<IUser> {
    return this.userService.getOne(id);
  }
}
