import { Controller } from '@nestjs/common';
import { DeckService } from './deck.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IDeck } from '@avans-nx-workshop/shared/api';
import { CreateDeckDto } from '@avans-nx-project/backend/dto';
@Controller('deck')
export class DeckController {
  constructor(private mealService: DeckService) {}

  @Get('')
  getAll(): IDeck[] {
    return this.mealService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): IDeck {
    return this.mealService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateDeckDto): IDeck {
    return this.mealService.create(data);
  }
}
