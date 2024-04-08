import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IUser } from '@avans-nx-workshop/shared/api';
import { Observable } from 'rxjs';
import { AuthService } from '@avans-nx-project/mtg-cards/user-auth/auth.service.ts'

@Component({
  selector: 'avans-nx-project-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  @Input() title!: string;
  //loggedInUser$: Observable<IUser>;
  //isNavbarCollapsed = true;

  constructor(private authService AuthService){}
}
