import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDeck } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { DeckService } from '../deck.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-project-deck-detail',
  templateUrl: './deck-detail.component.html',
  styles: [],
})
export class DeckDetailComponent implements OnInit, OnDestroy {
  deck!: IDeck;
  subscription!: Subscription;
  id!: string;

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.subscription = this.deckService.read(this.id).subscribe((result) => {
      console.log(`result: ${result}`);
      this.deck = result;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
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
