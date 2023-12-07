import { Controller } from '@nestjs/common';
import { SetService } from './set.service';
import { Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateSetDto } from '@avans-nx-project/backend/dto';
import { Set } from './set.schema';
@Controller('set')
export class SetController {
  constructor(private setService: SetService) {}

  @Get('')
  getAll(): Promise<Set[]> {
    return this.setService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Set> {
    return this.setService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateSetDto): Promise<Set> {
    return this.setService.createSet(data);
  }

  @Put(':id')
  put(@Body() data: Set): Promise<Set | null> {
    return this.setService.updateSet(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.setService.deleteSet(id);
  }
}
