/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
//import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-project/backend/dto';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */

/**
 *
 *
 */
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  TAG = 'UserService';

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    Logger.log('create', this.TAG);
    const createdUser = await new this.userModel(createUserDto);
    createdUser._id = new mongoose.Types.ObjectId().toString();
    createdUser.createdAt = new Date();
    return createdUser.save();
  }

  async getOne(id: string): Promise<User> {
    Logger.log(`getOne(${id})`, this.TAG);
    try {
      const user = await this.userModel.findOne({ _id: id }).exec();
      if (!user) {
        throw new NotFoundException(`User could not be found!`);
      }
      return user;
    } catch (error) {
      Logger.error(`Error getting user: ${error}`);
      throw new Error(`Error getting a user: ${error}`);
    }
  }

  list(): Promise<User[]> {
    Logger.log('getAll', this.TAG);
    return this.userModel.find().exec();
  }

  async updateUser(id: string, newUser: UpdateUserDto): Promise<User | null> {
    Logger.log(`update user with id: ${id}`);
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, newUser, { new: true })
        .exec();
      return updatedUser ?? null;
    } catch (error) {
      throw new Error(`Error updating user: ${error}`);
    }
  }

  async deleteUser(id: string) {
    Logger.log(`Delete deck ${id}`);
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async checkLogin(email: string, password: string) {
    Logger.log(`Checking login for user with email: ${email}`);
    try {
      const user = await this.userModel.findOne({ email, password }).exec();
      return user ?? null;
    } catch (error) {
      throw new Error(`Error checking login: ${error}`);
    }
  }
}
