import { Module } from '@nestjs/common';
import { DeckController } from './deck/deck.controller';
import { DeckService } from './deck/deck.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Deck, DeckSchema } from './deck/deck.schema';

@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://localhost:27017/mtg-website'),
    MongooseModule.forRoot(
      'mongodb://mongo:iNRVUYoKmbgjVKZkGZIYLaHwHFzdxnvi@mongodb.railway.internal:27017'
    ),
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
  ],
  controllers: [DeckController],
  providers: [DeckService],
  exports: [DeckService],
})
export class BackendFeaturesDeckModule {}
