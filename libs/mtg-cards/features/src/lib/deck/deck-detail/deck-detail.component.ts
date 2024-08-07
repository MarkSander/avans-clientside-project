import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDeck, IUser } from '@avans-nx-workshop/shared/api';
import { Subscription, switchMap } from 'rxjs';
import { DeckService } from '../deck.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@avans-nx-project/mtg-cards/user-auth';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'avans-nx-project-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrl: './deck-detail.component.css',
})
export class DeckDetailComponent implements OnInit, OnDestroy {
  deck!: IDeck;
  subscription!: Subscription;
  userSubscription!: Subscription;
  id!: string;
  user!: IUser;

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    private router: Router,
    protected authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    /*     this.subscription = this.deckService.read(this.id).subscribe((result) => {
      console.log(`result: ${result}`);
      this.deck = result;
    });
    this.userSubscription = this.userService
      .read(this.deck.userId)
      .subscribe((result) => {
        this.user = result;
      }); */
    this.subscription = this.deckService
      .read(this.id)
      .pipe(
        switchMap((deck) => {
          this.deck = deck;
          return this.userService.read(deck.userId);
        })
      )
      .subscribe(
        (user) => {
          this.user = user;
          console.log(`Deck: ${this.deck}`);
          console.log(`User: ${this.user}`);
        },
        (error) => {
          console.error(`Error loading deck or user data`, error);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
  deleteDeck() {
    this.deckService
      .delete(this.id)
      .pipe()
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(`Error during create card: ` + error);
        },
      });
  }
}
