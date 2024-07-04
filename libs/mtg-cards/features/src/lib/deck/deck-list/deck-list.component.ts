import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeckService } from '../deck.service';
import { IDeck } from '@avans-nx-workshop/shared/api';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '@avans-nx-project/mtg-cards/user-auth';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'avans-nx-project-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css'],
})
export class DeckListComponent implements OnInit, OnDestroy {
  decks: IDeck[] | null = null;
  subscription: Subscription | undefined = undefined;
  loggedInUser$!: Observable<boolean>;
  loggedInUser: boolean = false;

  constructor(
    private deckService: DeckService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //this.loggedInUser$ = this.authService.isLoggedIn$;
    const user = this.authService.getUserFromLocalStorage();
    this.loggedInUser = user !== undefined;
    this.subscription = this.deckService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.decks = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
