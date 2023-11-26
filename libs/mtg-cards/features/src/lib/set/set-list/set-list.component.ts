import { Component, OnInit, OnDestroy } from '@angular/core';
import { SetService } from '../set.service';
import { ISet } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-nx-project-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css'],
})
export class SetListComponent implements OnInit, OnDestroy {
  cards: ISet[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private setService: SetService) {}

  ngOnInit(): void {
    this.subscription = this.setService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.cards = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
