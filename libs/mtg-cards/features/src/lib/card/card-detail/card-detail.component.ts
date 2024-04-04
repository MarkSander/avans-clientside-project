import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICard } from '@avans-nx-workshop/shared/api';
import { CardService } from '../card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-nx-project-card-detail',
  templateUrl: './card-detail.component.html',
  styles: [],
})
export class CardDetailComponent implements OnInit, OnDestroy {
  card!: ICard;
  subscription!: Subscription;
  cardId!: string;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cardId = this.route.snapshot.params['id'];
    this.subscription = this.cardService
      .read(this.cardId)
      .subscribe((result) => {
        this.card = result;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  DeleteCard() {
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
}
