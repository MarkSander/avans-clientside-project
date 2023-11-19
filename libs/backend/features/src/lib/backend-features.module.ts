import { Module } from '@nestjs/common';
import { CardController } from './card/card.controller';
import { CardService } from './card/card.service';

@Module({
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class BackendFeaturesCardModule {}
