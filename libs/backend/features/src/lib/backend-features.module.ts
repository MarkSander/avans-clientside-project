import { Module } from '@nestjs/common';
import { CardController } from './card/card.controller';
import { MealService } from './card/card.service';

@Module({
  controllers: [CardController],
  providers: [MealService],
  exports: [MealService],
})
export class BackendFeaturesCardModule {}
