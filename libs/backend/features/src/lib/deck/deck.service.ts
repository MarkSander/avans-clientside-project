import { Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Deck } from './deck.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateDeckDto } from '@avans-nx-project/backend/dto';

@Injectable()
export class DeckService {
  constructor(@InjectModel(Deck.name) private deckModel: Model<Deck>) {}
  TAG = 'DeckService';

  getAll(): Promise<Deck[]> {
    Logger.log('getAll', this.TAG);
    return this.deckModel.find().exec();
  }

  async getOne(id: string): Promise<Deck> {
    Logger.log(`getOne(${id})`, this.TAG);
    try {
      const card = await this.deckModel.findOne({ _id: id }).exec();
      if (!card) {
        throw new NotFoundException(`Card could not be found!`);
      }
      return card;
    } catch (error) {
      Logger.error(`Error getting card: ${error}`);
      throw new Error(`Error getting a card: ${error}`);
    }
  }

  async createDeck(createDeckDto: CreateDeckDto): Promise<Deck> {
    const createdDeck = await new this.deckModel(createDeckDto);
    createdDeck._id = new mongoose.Types.ObjectId().toString();
    return createdDeck.save();
  }

  async updateDeck(newDeck: Deck): Promise<Deck | null> {
    const updateDeck = newDeck;

    try {
      const updatedDeck = await this.deckModel
        .findByIdAndUpdate(updateDeck._id, updateDeck)
        .exec();
      return updatedDeck ?? null;
    } catch (error) {
      throw new Error(`Error updating deck: ${error}`);
    }
  }

  async deleteDeck(id: string) {
    Logger.log(`Delete deck ${id}`);
    return await this.deckModel.findByIdAndDelete(id).exec();
  }
}
