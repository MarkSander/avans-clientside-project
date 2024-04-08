import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  BackendFeaturesCardModule,
  BackendFeaturesDeckModule,
  BackendFeaturesSetModule,
} from '@avans-nx-project/backend/features';
import { UserModule } from '@avans-nx-project/backend/user';

@Module({
  imports: [
    BackendFeaturesCardModule,
    BackendFeaturesSetModule,
    BackendFeaturesDeckModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
