import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SetService } from '../set.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
//import { AuthService } from '../../../auth/auth-service';
import { Set } from '../set.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'avans-nx-project-app-set-edit',
  templateUrl: './set-edit-view.component.html',
})
export class SetEditComponent implements OnInit {
  subscription: Subscription | undefined;

  //public selectedValue: string;

  public setPreDefined = new Set();

  // id = this.route.snapshot.params.id;
  set = new Set();
  subscriptionoptions: Subscription = new Subscription();
  subscriptionParams: Subscription = new Subscription();

  constructor(
    private setService: SetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('edit page called');

    this.subscription = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.setService.getSetById(params?.get('id') as string);
        })
      )
      .subscribe(
        (data) => {
          this.set = data;
        },
        (error) => {}
      );
  }

  updateSet() {
    //this.fighter.fighterMadeBy = this.authService.currentUser$.value._id;
    this.subscriptionParams = this.setService
      .editSet(this.set._id, this.set)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/sets']);
      });
    alert('Fighter is edited');
  }
}
