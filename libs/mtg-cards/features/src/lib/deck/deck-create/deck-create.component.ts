import { Component } from '@angular/core';
import { DeckService } from '../deck.service';
import { IDeck } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'avans-nx-project-deck-create',
  templateUrl: './deck-create.component.html',
})
export class DeckListComponent {
  deck: IDeck | null = null;
  subscription: Subscription | undefined = undefined;
  form!: FormGroup;

  constructor(private deckService: DeckService, private router: Router) {}

  OnSave() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const newDeck: IDeck = {
        ...this.deck,
        ...formValue,
      };
      this.deckService.create(newDeck).subscribe(
        () => {
          this.router.navigateByUrl('./decks');
        },
        (error) => {
          throw new Error(`Error creating deck: ${error}`);
        }
      );
    }
  }
}
