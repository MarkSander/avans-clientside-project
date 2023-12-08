import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  BackendFeaturesCardModule,
  BackendFeaturesSetModule,
} from '@avans-nx-project/backend/features';

@Module({
  imports: [BackendFeaturesCardModule, BackendFeaturesSetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
