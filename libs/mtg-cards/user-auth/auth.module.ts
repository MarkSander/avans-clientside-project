import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent],
  exports: [RouterModule],
})
export class AuthModule {}
