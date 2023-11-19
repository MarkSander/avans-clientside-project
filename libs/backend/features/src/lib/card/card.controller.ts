import { Controller } from '@nestjs/common';
import { CardService } from './card.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { ICard } from '@avans-nx-workshop/shared/api';
import { CreateCardDto } from '@avans-nx-project/backend/dto';
@Controller('card')
export class CardController {
  constructor(private mealService: CardService) {}

  @Get('')
  getAll(): ICard[] {
    return this.mealService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): ICard {
    return this.mealService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateCardDto): ICard {
    return this.mealService.create(data);
  }
}
