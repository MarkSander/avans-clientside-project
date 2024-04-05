import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SetController } from './set/set.controller';
import { SetService } from './set/set.service';
import { Set, SetSchema } from './set/set.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo:iNRVUYoKmbgjVKZkGZIYLaHwHFzdxnvi@mongodb.railway.internal:27017'
    ),
    MongooseModule.forFeature([{ name: Set.name, schema: SetSchema }]),
  ],
  controllers: [SetController],
  providers: [SetService],
  exports: [SetService],
})
export class BackendFeaturesSetModule {}
