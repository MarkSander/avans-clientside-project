import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Put()
  putData() {
    return this.appService.putData();
  }

  @Delete()
  deleteData() {
    return this.appService.deleteData();
  }

  @Post()
  postData() {
    return this.appService.postData();
  }
}
