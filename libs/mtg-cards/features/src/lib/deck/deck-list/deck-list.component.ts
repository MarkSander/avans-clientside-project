import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeckService } from '../deck.service';
import { IDeck } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-nx-project-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css'],
})
export class DeckListComponent implements OnInit, OnDestroy {
  decks: IDeck[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.subscription = this.deckService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.decks = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
