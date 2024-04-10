import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, first } from 'rxjs';
import { SetService } from '../set.service';
import { ISet, IUser } from '@avans-nx-workshop/shared/api';
import { AuthService } from '@avans-nx-project/mtg-cards/user-auth';
//import { getRandomValues } from 'crypto';

@Component({
  selector: 'avans-nx-project-app-setlist',
  templateUrl: './setlist.component.html',
  styles: [],
})
export class SetlistComponent implements OnInit, OnDestroy {
  sets: ISet[] | null = null;
  subscription: Subscription | undefined = undefined;
  mayEdit: boolean = false;
  user: IUser | undefined;
  testuser!: IUser;

  constructor(
    private setService: SetService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    /*     const varr = localStorage.getItem('currentuser');
    if (varr) {
      const userData = JSON.parse(varr);
      this.user = userData.results;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.authService.currentUser$.pipe(first()).subscribe((user: any) => {
      if (user) {
        const userData = JSON.parse(user);
        this.testuser = userData.results;
      }
    });
    console.log(`Current user: ${JSON.stringify(this.user)}`);
    console.log(`Current role ${this.user?.role}`);
    if (this.user?.role === 'Admin') {
      this.mayEdit = true;
    } */
    this.user = this.authService.getUserFromLocalStorage();
    if (this.user?.role === 'Admin' || this.user?.role === 'Editor') {
      this.mayEdit = true;
    }
    this.subscription = this.setService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.sets = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.mayEdit) this.mayEdit = false;
    if (this.authService.currentUser$)
      this.authService.currentUser$.unsubscribe();
  }
}
