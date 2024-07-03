import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'avans-nx-project-login',
  templateUrl: './loginn.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const val = this.form.value;
    /*     if (val.email && val.password) {
      this.authService
        .login(val.email, val.password)
        .pipe(first())
        .subscribe(() => {
          this.router.navigateByUrl('/');
        });
    } */
    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe((data) => {
        if (data) this.router.navigateByUrl('/');
        else this.form.setErrors({ unauthenticated: true });
      });
    }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
