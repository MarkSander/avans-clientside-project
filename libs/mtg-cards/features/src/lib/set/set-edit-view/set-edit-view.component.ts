import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, first } from 'rxjs';
import { SetService } from '../set.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { AuthService } from '../../../auth/auth-service';
import { ISet } from '@avans-nx-workshop/shared/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'avans-nx-project-app-set-edit',
  templateUrl: './set-edit-view.component.html',
})
export class SetEditComponent implements OnInit, OnDestroy {
  set!: ISet;
  subscribtion!: Subscription;
  setId!: string;
  form!: FormGroup;
  addMode!: boolean;

  constructor(
    private setService: SetService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setId = this.route.snapshot.params['id'];
    this.addMode = !this.setId;

    this.form = this.formBuilder.group({
      _id: this.setId,
      name: ['', Validators.required],
      releasedate: ['', Validators.required],
      setcode: ['', Validators.required],
      cardsinset: ['', Validators.required],
    });

    if (!this.addMode) {
      this.setService
        .read(this.setId)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  ngOnDestroy(): void {
    if (this.subscribtion) this.subscribtion.unsubscribe();
  }

  OnSubmit() {
    if (this.form.invalid) return;
    if (this.addMode) {
      this.createSet();
    } else {
      this.editSet();
    }
  }

  private createSet() {
    this.setService
      .create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(`Error during create set: ${error}`);
        },
      });
  }

  private editSet() {
    this.setService
      .edit(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(`Error editing set: ${error}`);
        },
      });
  }
}
