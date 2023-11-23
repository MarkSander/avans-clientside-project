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
      id: '0',
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

  getOne(id: string): ICard {
    Logger.log(`getOne(${id})`, this.TAG);
    const card = this.cards$.value.find((td) => td.id === id);
    if (!card) {
      throw new NotFoundException(`Card could not be found!`);
    }
    return card;
  }

  /**
   * Update the arg signature to match the DTO, but keep the
   * return signature - we still want to respond with the complete
   * object
   */
  create(
    card: Pick<ICard, 'title' | 'type' | 'rarity' | 'legendary' | 'manacost'>
  ): ICard {
    Logger.log('create', this.TAG);
    const current = this.cards$.value;
    // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
    const newCard: ICard = {
      ...card,
      id: `card-${Math.floor(Math.random() * 10000)}`,
    };
    this.cards$.next([...current, newCard]);
    return newCard;
  }

  createCard(createCardDto: CreateCardDto): Promise<Card> {
    const createdCard = new this.cardModel(createCardDto);
    return createdCard.save();
  }
}
