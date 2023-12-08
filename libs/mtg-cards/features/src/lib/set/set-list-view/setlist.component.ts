import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Set } from '../set.model';
import { SetService } from '../set.service';
import { ISet } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-project-app-setlist',
  templateUrl: './setlist.component.html',
  styles: [],
})
export class SetlistComponent implements OnInit, OnDestroy {
  sets: ISet[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private setService: SetService) {}

  ngOnInit(): void {
    this.subscription = this.setService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.sets = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
