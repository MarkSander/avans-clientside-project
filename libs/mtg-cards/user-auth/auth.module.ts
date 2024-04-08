import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService],
  exports: [RouterModule],
})
export class AuthModule {}
