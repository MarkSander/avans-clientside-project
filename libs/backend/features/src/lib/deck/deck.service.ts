import { Injectable, NotFoundException } from '@nestjs/common';
import { IDeck } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class DeckService {
  TAG = 'DeckService';

  private decks$ = new BehaviorSubject<IDeck[]>([
    {
      id: '0',
      title: 'Apex Devastator',
      type: 'Creature',
      rarity: 'Mythic',
      legendary: true,
      manacost: 10,
    },
  ]);

  getAll(): IDeck[] {
    Logger.log('getAll', this.TAG);
    return this.decks$.value;
  }

  getOne(id: string): IDeck {
    Logger.log(`getOne(${id})`, this.TAG);
    const deck = this.decks$.value.find((td) => td.id === id);
    if (!deck) {
      throw new NotFoundException(`Deck could not be found!`);
    }
    return deck;
  }

  /**
   * Update the arg signature to match the DTO, but keep the
   * return signature - we still want to respond with the complete
   * object
   */
  create(
    deck: Pick<IDeck, 'title' | 'type' | 'rarity' | 'legendary' | 'manacost'>
  ): IDeck {
    Logger.log('create', this.TAG);
    const current = this.decks$.value;
    // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
    const newDeck: IDeck = {
      ...deck,
      id: `deck-${Math.floor(Math.random() * 10000)}`,
    };
    this.decks$.next([...current, newDeck]);
    return newDeck;
  }
}
