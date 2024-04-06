import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISet } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { SetService } from '../set.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-project-set-detail',
  templateUrl: './set-detail.component.html',
  styles: [],
})
export class SetDetailComponent implements OnInit, OnDestroy {
  set!: ISet;
  subscription!: Subscription;
  id!: string;

  constructor(
    private setService: SetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.subscription = this.setService.read(this.id).subscribe((result) => {
      console.log(`result: ${result}`);
      this.set = result;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  deleteDeck() {
    this.setService
      .delete(this.id)
      .pipe()
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(`Error during delete set: ` + error);
        },
      });
  }
}
