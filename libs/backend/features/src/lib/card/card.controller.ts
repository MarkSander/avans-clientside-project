import { Controller } from '@nestjs/common';
import { CardService } from './card.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { CreateCardDto } from '@avans-nx-project/backend/dto';
import { Card } from './card.schema';
@Controller('card')
export class CardController {
  constructor(private mealService: CardService) {}

  @Get('')
  getAll(): Promise<Card[]> {
    return this.mealService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Card> {
    return this.mealService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateCardDto): Promise<Card> {
    return this.mealService.createCard(data);
  }
}
