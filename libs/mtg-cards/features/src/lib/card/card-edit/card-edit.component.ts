import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../card.service';
import {
  CardRarity,
  CardTypes,
  ICard,
  ISet,
} from '@avans-nx-workshop/shared/api';
import { Subscription, first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetService } from '../../set/set.service';
import { ImageService } from '../../image/image.service';

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
    private setService: SetService,
    private imageService: ImageService
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
      image: [''],
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

  /*   private createCard() {
    this.form.patchValue({
      image: this.imageService.get(this.form.get('title')?.value),
    });
    console.log(`image being send: ${this.form.get('image')?.value}`);
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
  } */

  private createCard() {
    const cardTitle = this.form.get('title')?.value;

    this.imageService.get(cardTitle).subscribe({
      next: (imageUrl: string) => {
        this.form.patchValue({ image: imageUrl });
        console.log(`Image being sent: ${this.form.get('image')?.value}`);

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
      },
      error: (error) => {
        console.error(`Error fetching card image: `, error);
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

  get title() {
    return this.form.get('title');
  }
  get type() {
    return this.form.get('type');
  }
  get rarity() {
    return this.form.get('rarity');
  }
  get manacost() {
    return this.form.get('manacost');
  }
  get releasedate() {
    return this.form.get('releasedate');
  }
  get set() {
    return this.form.get('setId');
  }
}
