import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { Observable } from 'rxjs';
import { AuthService } from '@avans-nx-project/mtg-cards/user-auth';
import { IUser } from '@avans-nx-workshop/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'avans-nx-project-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Input() title!: string;
  loggedInUser$!: Observable<boolean>;
  user: IUser | undefined;
  isAdmin: boolean = false;
  //loggedInUser: IUser | undefined;
  //isNavbarCollapsed = true;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.isLoggedIn$;
    this.user = this.authService.getUserFromLocalStorage();
    if (this.user?.role === 'Admin') {
      this.isAdmin = true;
    }
  }

  logout() {
    this.authService.logout();
  }
  //constructor(private ){}
}
