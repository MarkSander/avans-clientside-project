/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SetService } from '../set.service';
import { ISet, IUser } from '@avans-nx-workshop/shared/api';
import { AuthService } from '@avans-nx-project/mtg-cards/user-auth';
import { CardService } from '../../card/card.service';
//import { getRandomValues } from 'crypto';

@Component({
  selector: 'avans-nx-project-app-setlist',
  templateUrl: './setlist.component.html',
  styles: [],
})
export class SetlistComponent implements OnInit, OnDestroy {
  sets: ISet[] | null = null;
  subscription: Subscription | undefined = undefined;
  cardSubscription: Subscription | undefined = undefined;
  mayEdit: boolean = false;
  user: IUser | undefined;
  testuser!: IUser;
  cardCount: number = 0;

  constructor(
    private setService: SetService,
    private authService: AuthService,
    protected cardService: CardService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalStorage();
    if (this.user?.role === 'Admin' || this.user?.role === 'Editor') {
      this.mayEdit = true;
    }
    this.subscription = this.setService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.sets = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.mayEdit) this.mayEdit = false;
    if (this.authService.currentUser$)
      this.authService.currentUser$.unsubscribe();
    if (this.cardSubscription) this.cardSubscription.unsubscribe();
  }

  getCardCount(setId: string): any {
    this.cardSubscription = this.cardService
      .allCardsInSet(setId)
      .subscribe((cards) => {
        console.log(`Cards length: ${cards.length}`);
        return cards.length;
      });
  }
}
