import { Injectable, NotFoundException } from '@nestjs/common';
import { ICard } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './card.schema';
import { Model } from 'mongoose';
import { CreateCardDto } from '@avans-nx-project/backend/dto';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}
  TAG = 'CardService';

  private cards$ = new BehaviorSubject<ICard[]>([
    {
      _id: '0',
      title: 'Apex Devastator',
      type: 'Creature',
      rarity: 'Mythic',
      legendary: true,
      manacost: 10,
    },
  ]);

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

  createCard(createCardDto: CreateCardDto): Promise<Card> {
    const createdCard = new this.cardModel(createCardDto);
    return createdCard.save();
  }
}
