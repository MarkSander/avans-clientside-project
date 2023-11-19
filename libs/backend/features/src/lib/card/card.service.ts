import { Injectable, NotFoundException } from '@nestjs/common';
import { ICard } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class CardService {
  TAG = 'CardService';

  private cards$ = new BehaviorSubject<ICard[]>([
    {
      id: '0',
      title: 'Spaghetti con funghi',
      description: 'Vega version of the famous spaghetti recipe.',
      isVega: true,
      dateServed: new Date(),
    },
  ]);

  getAll(): ICard[] {
    Logger.log('getAll', this.TAG);
    return this.cards$.value;
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
  create(card: Pick<ICard, 'title' | 'description'>): ICard {
    Logger.log('create', this.TAG);
    const current = this.cards$.value;
    // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
    const newCard: ICard = {
      ...card,
      id: `card-${Math.floor(Math.random() * 10000)}`,
      isVega: false,
      dateServed: new Date(),
    };
    this.cards$.next([...current, newCard]);
    return newCard;
  }
}
