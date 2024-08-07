import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICard, IDeck, IUser } from '@avans-nx-workshop/shared/api';
import { CardService } from '../card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { DeckService } from '../../deck/deck.service';
import { SetService } from '../../set/set.service';
import { AuthService } from '@avans-nx-project/mtg-cards/user-auth';

@Component({
  selector: 'avans-nx-project-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css'],
})
export class CardDetailComponent implements OnInit, OnDestroy {
  card!: ICard;
  subscription!: Subscription;
  decksubscription!: Subscription;
  allDecks: IDeck[] = [];
  cardId!: string;
  user: IUser | undefined;
  mayEdit: boolean = false;

  constructor(
    private cardService: CardService,
    private deckService: DeckService,
    private setService: SetService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cardId = this.route.snapshot.params['id'];
    this.subscription = this.cardService
      .read(this.cardId)
      .subscribe((result) => {
        this.card = result;
      });
    this.user = this.authService.getUserFromLocalStorage();
    if (this.user?.role === 'Admin' || this.user?.role === 'Editor') {
      this.mayEdit = true;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.decksubscription) this.decksubscription.unsubscribe();
    this.mayEdit = false;
  }
  DeleteCard() {
    this.DeleteCardFromDecks();

    this.cardService
      .delete(this.cardId)
      .pipe()
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(`Error deleting card: ` + error);
        },
      });
  }

  DeleteCardFromDecks() {
    // Create a Promise to wait for the subscription to emit a value
    const promise = new Promise<void>((resolve, reject) => {
      this.decksubscription = this.deckService.list().subscribe((results) => {
        console.log(`Decks found in deletecardfromdecks: ${results}`);
        if (results) {
          this.allDecks = results;
          resolve();
        } else {
          reject(new Error('No decks found.'));
        }
      });
    });

    // Wait for the Promise to resolve, then execute the code
    promise
      .then(() => {
        if (this.allDecks.length > 0) {
          console.log('Entered if statement');
          this.allDecks.forEach((deck) => {
            console.log(`finding card in deck: ${deck.name}`);
            const cardIndex = deck.cards.findIndex((x) => x._id == this.cardId);
            console.log(`CardIndexfound: ${cardIndex}`);
            if (cardIndex != -1) {
              console.log(`Card will be deleted`);
              deck.cards.splice(cardIndex, 1);
              this.UpdateDeck(deck);
            }
          });
        }
      })
      .catch((error) => {
        console.error('Error in DeleteCardFromDecks:', error);
      });
  }

  UpdateDeck(deck: IDeck) {
    this.deckService
      .edit(deck)
      .pipe(first())
      .subscribe({
        error: (error) => {
          console.log(`Error editing deck: ${error}`);
        },
      });
  }
}
