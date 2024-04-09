import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@avans-nx-project/mtg-cards/user-auth';
import { DeckService } from '../../deck/deck.service';

@Component({
  selector: 'avans-nx-project-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user!: IUser;
  subscription!: Subscription;
  id!: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    protected authService: AuthService,
    private deckService: DeckService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.subscription = this.userService.read(this.id).subscribe((result) => {
      console.log(`result: ${result}`);
      this.user = result;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  deleteUser() {
    this.userService
      .delete(this.id)
      .pipe()
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(`Error during create card: ` + error);
        },
      });
  }
}
