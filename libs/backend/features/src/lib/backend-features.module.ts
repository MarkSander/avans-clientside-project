import { Module } from '@nestjs/common';
import { CardController } from './card/card.controller';
import { CardService } from './card/card.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './card/card.schema';

@Module({
  imports: [
    /*     MongooseModule.forRoot('mongodb://localhost:27017/mtg-website'), */
    MongooseModule.forRoot(
      'mongodb://mongo:iNRVUYoKmbgjVKZkGZIYLaHwHFzdxnvi@mongodb.railway.internal:27017'
    ),
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class BackendFeaturesCardModule {}
