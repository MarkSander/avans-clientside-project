import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SetController } from './set/set.controller';
import { SetService } from './set/set.service';
import { Set, SetSchema } from './set/set.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo:eb3BCb445Deegba2g55hh454-G2C5Ga1@monorail.proxy.rlwy.net:41390'
    ),
    MongooseModule.forFeature([{ name: Set.name, schema: SetSchema }]),
  ],
  controllers: [SetController],
  providers: [SetService],
  exports: [SetService],
})
export class BackendFeaturesSetModule {}
