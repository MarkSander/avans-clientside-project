import { Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './card.schema';
import mongoose, { Model } from 'mongoose';
import { CreateCardDto } from '@avans-nx-project/backend/dto';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}
  TAG = 'CardService';

  getAll(): Promise<Card[]> {
    Logger.log('getAll', this.TAG);
    return this.cardModel.find().exec();
  }

  async getOne(id: string): Promise<Card> {
    Logger.log(`getOne(${id})`, this.TAG);
    try {
      const card = await this.cardModel.findOne({ _id: id }).exec();
      if (!card) {
        throw new NotFoundException(`Card could not be found!`);
      }
      return card;
    } catch (error) {
      Logger.error(`Error getting card: ${error}`);
      throw new Error(`Error getting a card: ${error}`);
    }
  }

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const createdCard = await new this.cardModel(createCardDto);
    createdCard._id = new mongoose.Types.ObjectId().toString();
    return createdCard.save();
  }

  async updateCard(newCard: Card): Promise<Card | null> {
    const updateCard = newCard;

    try {
      const updatedCard = await this.cardModel
        .findByIdAndUpdate(updateCard._id, updateCard)
        .exec();
      return updatedCard ?? null;
    } catch (error) {
      throw new Error(`Error updating card: ${error}`);
    }
  }

  async deleteCard(id: string) {
    Logger.log(`Delete card ${id}`);
    return await this.cardModel.findByIdAndDelete(id).exec();
  }
}
