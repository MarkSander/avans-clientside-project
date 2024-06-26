import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../card.service';
import { ICard, IDeck } from '@avans-nx-workshop/shared/api';
import { Subscription, first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../../deck/deck.service';

@Component({
  selector: 'avans-nx-project-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit, OnDestroy {
  cards: ICard[] | null = null;
  deck!: IDeck;
  subscription: Subscription | undefined = undefined;
  deckSubscription!: Subscription;
  deckId!: string;
  addCardMode!: boolean;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private deckService: DeckService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.deckId = this.route.snapshot.params['id'];
    this.addCardMode = !this.deckId;

    if (this.deckId) {
      this.deckSubscription = this.deckService
        .read(this.deckId)
        .subscribe((result) => {
          this.deck = result;
        });
    }
    this.subscription = this.cardService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.cards = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.deckSubscription) this.deckSubscription.unsubscribe();
  }

  AddToDeck(card: ICard) {
    console.log('adding card: ' + card.title);
    this.deck.cards.push(card);
    console.log('new deck: ' + this.deck);
    console.log('Cards in deck ' + this.deck.cards);
    this.deckService
      .edit(this.deck)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(`Error adding Card to Deck: ` + error);
        },
      });
  }
}
