import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '@avans-nx-project/backend/features';
import { Subscription } from 'rxjs';
import { CardService } from '../card.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'avans-nx-project-card-edit',
  templateUrl: './card-edit.component.html',
  styles: [],
})
export class CardEditComponent implements OnInit, OnDestroy {
  id: string | null = null;
  card: Card | null = null;
  subscription: Subscription | undefined = undefined;
  form!: FormGroup;
  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
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
      this.fillFormData();
    });

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      rarity: ['', Validators.required],
      manacost: ['', Validators.required],
      legendary: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private fillFormData() {
    if (this.card && this.form) {
      this.form.patchValue({
        title: this.card.title,
        type: this.card.type,
        rarity: this.card.rarity,
        manacost: this.card.manacost,
        legendary: this.card.legendary,
      });
    }
  }

  public onSubmit() {
    if (this.card && this.form.valid) {
      const formvalue = this.form.value;
      const newCard: Card = {
        ...this.card,
        ...formvalue,
      };
      this.cardService.edit(newCard).subscribe(
        () => {
          this.router.navigateByUrl('/cards');
        },
        (error) => {
          throw new Error(`Erro editing card: ${error}`);
        }
      );
    }
  }
}
