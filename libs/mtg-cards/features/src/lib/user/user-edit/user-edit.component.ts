import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IDeck } from '@avans-nx-workshop/shared/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '@avans-nx-project/mtg-cards/user-auth';

@Component({
  selector: 'avans-nx-project-deck-create',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {
  deck: IDeck | null = null;
  form!: FormGroup;
  keys = Object.keys;
  id!: string;
  addmode!: boolean;
  userId!: string | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    const user = this.authService.getUserFromLocalStorage();
    this.userId = user?._id;
    this.form = this.formBuilder.group({
      _id: this.id,
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.userService
      .read(this.id)
      .pipe(first())
      .subscribe((x) => this.form.patchValue(x));
  }
  OnSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.editDeck();
  }

  private editDeck() {
    this.userService
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
}
