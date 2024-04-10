import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICard, ISet, IUser } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { SetService } from '../set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../card/card.service';
import { AuthService } from '@avans-nx-project/mtg-cards/user-auth';

@Component({
  selector: 'avans-nx-project-set-detail',
  templateUrl: './set-detail.component.html',
  styles: [],
})
export class SetDetailComponent implements OnInit, OnDestroy {
  set!: ISet;
  subscription!: Subscription;
  cardSubscription!: Subscription;
  cards!: ICard[];
  id!: string;
  user: IUser | undefined;
  isAdmin: boolean = false;

  constructor(
    private setService: SetService,
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.subscription = this.setService.read(this.id).subscribe((result) => {
      console.log(`result: ${result}`);
      this.set = result;
    });
    this.cardSubscription = this.cardService
      .allCardsInSet(this.id)
      .subscribe((result) => {
        this.cards = result;
      });
    this.user = this.authService.getUserFromLocalStorage();
    if (this.user?.role === 'Admin') {
      this.isAdmin = true;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.cardSubscription) this.cardSubscription.unsubscribe();
    this.isAdmin = false;
  }
  deleteDeck() {
    this.setService
      .delete(this.id)
      .pipe()
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(`Error during delete set: ` + error);
        },
      });
  }
}
