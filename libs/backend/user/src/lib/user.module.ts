import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
//import { mongourl } from 'libs/backend/features/src/mongo_environment';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo:iNRVUYoKmbgjVKZkGZIYLaHwHFzdxnvi@mongodb.railway.internal:27017'
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
