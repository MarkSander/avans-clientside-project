import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { IUser } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-project-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit, OnDestroy {
  users!: IUser[] | null;
  subscription: Subscription | undefined = undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.users = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
