import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '@avans-nx-project/backend/features';
import { Subscription } from 'rxjs';
import { CardService } from '../card.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'avans-nx-project-card-detail',
  templateUrl: './card-detail.component.html',
  styles: [],
})
export class CardDetailComponent implements OnInit, OnDestroy {
  id: string | null = null;
  card: Card | null = null;
  subscription: Subscription | undefined = undefined;
  constructor(
    private cardService: CardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = idParam;
      }
    });

    console.log(`Sending getOne request with id ${this.id}`);
    this.subscription = this.cardService.read(this.id).subscribe((result) => {
      console.log(`result: ${result}`);
      this.card = result;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
