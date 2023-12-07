import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SetController } from './set/set.controller';
import { SetService } from './set/set.service';
import { Set, SetSchema } from './set/set.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mtg-website'),
    MongooseModule.forFeature([{ name: Set.name, schema: SetSchema }]),
  ],
  controllers: [SetController],
  providers: [SetService],
  exports: [SetService],
})
export class BackendFeaturesSetModule {}
