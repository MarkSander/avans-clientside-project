import { Controller } from '@nestjs/common';
import { DeckService } from './deck.service';
import { Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateDeckDto } from '@avans-nx-project/backend/dto';
import { Deck } from './deck.schema';
@Controller('deck')
export class DeckController {
  constructor(private deckService: DeckService) {}

  @Get('')
  getAll(): Promise<Deck[]> {
    return this.deckService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Deck> {
    return this.deckService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateDeckDto): Promise<Deck> {
    return this.deckService.createDeck(data);
  }

  @Put(':id')
  put(@Body() data: Deck): Promise<Deck | null> {
    return this.deckService.updateDeck(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deckService.deleteDeck(id);
  }
}
