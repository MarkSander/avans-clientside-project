import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../card.service';
import { ICard } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-nx-project-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit, OnDestroy {
  cards: ICard[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.subscription = this.cardService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.cards = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
