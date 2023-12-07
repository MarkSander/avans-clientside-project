import { Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Set } from './set.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateSetDto } from '@avans-nx-project/backend/dto';

@Injectable()
export class SetService {
  constructor(@InjectModel(Set.name) private setModel: Model<Set>) {}
  TAG = 'SetService';

  getAll(): Promise<Set[]> {
    Logger.log('getAll', this.TAG);
    return this.setModel.find().exec();
  }

  async getOne(id: string): Promise<Set> {
    Logger.log(`getOne(${id})`, this.TAG);
    try {
      const card = await this.setModel.findOne({ _id: id }).exec();
      if (!card) {
        throw new NotFoundException(`Card could not be found!`);
      }
      return card;
    } catch (error) {
      Logger.error(`Error getting card: ${error}`);
      throw new Error(`Error getting a card: ${error}`);
    }
  }

  async createSet(createSetDto: CreateSetDto): Promise<Set> {
    const createdSet = await new this.setModel(createSetDto);
    createdSet._id = new mongoose.Types.ObjectId().toString();
    return createdSet.save();
  }

  async updateSet(newSet: Set): Promise<Set | null> {
    const updateSet = newSet;

    try {
      const updatedSet = await this.setModel
        .findByIdAndUpdate(updateSet._id, updateSet)
        .exec();
      return updatedSet ?? null;
    } catch (error) {
      throw new Error(`Error updating set: ${error}`);
    }
  }

  async deleteSet(id: string) {
    Logger.log(`Delete set ${id}`);
    return await this.setModel.findByIdAndDelete(id).exec();
  }
}
