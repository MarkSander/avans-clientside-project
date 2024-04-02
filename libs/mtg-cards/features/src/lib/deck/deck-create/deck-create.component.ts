import { Component, OnInit } from '@angular/core';
import { DeckService } from '../deck.service';
import { IDeck, DeckFormat } from '@avans-nx-workshop/shared/api';
/* import { Subscription } from 'rxjs'; */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-project-deck-create',
  templateUrl: './deck-create.component.html',
})
export class DeckCreateComponent implements OnInit {
  deck: IDeck | null = null;
  /*   subscription: Subscription | undefined = undefined;
   */
  form!: FormGroup;
  keys = Object.keys;
  options = DeckFormat;

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      format: ['', Validators.required],
    });
  }
  OnSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const newDeck: IDeck = {
        ...this.deck,
        ...formValue,
      };
      this.deckService.create(newDeck).subscribe(
        () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (error) => {
          throw new Error(`Error creating deck: ${error}`);
        }
      );
    }
  }
}
