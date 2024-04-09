import { Injectable, NotFoundException } from '@nestjs/common';
/* import { ICard } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs'; */
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './card.schema';
import mongoose, { Model } from 'mongoose';
import { CreateCardDto, UpdateCardDto } from '@avans-nx-project/backend/dto';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}
  TAG = 'CardService';

  /*   private cards$ = new BehaviorSubject<ICard[]>([
    {
      id: '0',
      title: 'Apex Devastator',
      type: 'Creature',
      rarity: 'Mythic',
      legendary: true,
      manacost: 10,
    },
  ]); */

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

  /**
   * Update the arg signature to match the DTO, but keep the
   * return signature - we still want to respond with the complete
   * object
   */
  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    Logger.log('create', this.TAG);
    const createdCard = await new this.cardModel(createCardDto);
    createdCard._id = new mongoose.Types.ObjectId().toString();
    return createdCard.save();
  }

  async updateCard(id: string, newCard: UpdateCardDto): Promise<Card | null> {
    Logger.log(`updating card with ${id}`);
    Logger.log(newCard);
    try {
      const updatedCard = await this.cardModel
        .findByIdAndUpdate(id, newCard)
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

  getAllCardsInSet(id: string) {
    return this.cardModel.find({ setId: id }).exec();
  }
}
