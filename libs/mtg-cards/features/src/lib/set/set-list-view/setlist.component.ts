import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Set } from '../set.model';
import { SetService } from '../set.service';

@Component({
  selector: 'avans-nx-project-app-setlist',
  templateUrl: './setlist.component.html',
  styles: [],
})
export class SetlistComponent implements OnInit {
  sets: Observable<Set[]> = new Observable<Set[]>();

  constructor(private setService: SetService) {}

  ngOnInit(): void {
    console.log('setList aangeroepen');
    this.sets = this.setService.getAllSets();
  }
}
