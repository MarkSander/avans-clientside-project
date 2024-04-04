import { Controller, Delete, Put } from '@nestjs/common';
import { CardService } from './card.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { CreateCardDto, UpdateCardDto } from '@avans-nx-project/backend/dto';
import { Card } from './card.schema';
@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get('')
  getAll(): Promise<Card[]> {
    return this.cardService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Card> {
    return this.cardService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateCardDto): Promise<Card> {
    return this.cardService.createCard(data);
  }

  @Put(':id')
  put(
    @Param('id') id: string,
    @Body() data: UpdateCardDto
  ): Promise<Card | null> {
    return this.cardService.updateCard(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cardService.deleteCard(id);
  }
}
