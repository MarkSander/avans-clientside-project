import { Component, OnInit } from '@angular/core';
import { DeckService } from '../deck.service';
import { IDeck, DeckFormat } from '@avans-nx-workshop/shared/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '@avans-nx-project/mtg-cards/user-auth';

@Component({
  selector: 'avans-nx-project-deck-create',
  templateUrl: './deck-create.component.html',
  styleUrl: './deck-create.component.css',
})
export class DeckCreateComponent implements OnInit {
  deck: IDeck | null = null;
  form!: FormGroup;
  keys = Object.keys;
  options = DeckFormat;
  id!: string;
  addmode!: boolean;
  userId!: string | undefined;

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addmode = !this.id;
    const user = this.authService.getUserFromLocalStorage();
    this.userId = user?._id;
    this.form = this.formBuilder.group({
      _id: this.id,
      name: ['', Validators.required],
      format: ['', Validators.required],
      userId: this.userId,
      cards: [[]],
    });

    if (!this.addmode) {
      this.deckService
        .read(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }
  OnSubmit() {
    if (this.form.invalid) {
      return;
    }

    if (this.addmode) {
      this.createDeck();
    } else {
      this.editDeck();
    }

    /*     if (this.form.valid) {
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
    } */
  }

  private createDeck() {
    this.deckService
      .create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(`Error creating card: ` + error);
        },
      });
  }

  private editDeck() {
    this.deckService
      .edit(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(`Error editing deck: ` + error);
        },
      });
  }

  get name() {
    return this.form.get('name');
  }

  get format() {
    return this.form.get('format');
  }
}
