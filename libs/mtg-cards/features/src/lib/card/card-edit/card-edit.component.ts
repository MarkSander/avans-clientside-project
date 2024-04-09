import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../card.service';
import {
  CardRarity,
  CardTypes,
  ICard,
  ISet,
} from '@avans-nx-workshop/shared/api';
import { Observable, Subscription, first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetService } from '../../set/set.service';

@Component({
  selector: 'avans-nx-project-card-edit',
  templateUrl: './card-edit.component.html',
})
export class CardEditComponent implements OnInit, OnDestroy {
  card: ICard | null = null;
  subscription: Subscription | undefined = undefined;
  id: string | null = null;
  form!: FormGroup;
  addMode!: boolean;
  keys = Object.keys;
  typeOptions = CardTypes;
  rarityOptions = CardRarity;
  sets!: ISet[] | null;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private setService: SetService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addMode = !this.id;
    this.setService.list().subscribe((sets) => {
      this.sets = sets;
    });

    this.form = this.formBuilder.group({
      _id: this.id,
      title: ['', Validators.required],
      type: ['', Validators.required],
      rarity: ['', Validators.required],
      foil: ['', Validators.required],
      manacost: ['', Validators.required],
      releasedate: ['', Validators.required],
      setId: ['', Validators.required],
    });

    if (!this.addMode) {
      this.cardService
        .read(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  public OnSubmit() {
    // If foil checkbox is not checked, set foil to false
    if (!this.form.value.foil) {
      this.form.patchValue({ foil: false });
    }
    if (this.form.invalid) {
      return;
    }
    if (this.addMode) {
      this.createCard();
    } else {
      this.editCard();
    }
  }

  private createCard() {
    this.cardService
      .create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(`Error during create card: ` + error);
        },
      });
  }
  private editCard() {
    this.cardService
      .edit(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(`Error editing card: ` + error);
        },
      });
  }
}
