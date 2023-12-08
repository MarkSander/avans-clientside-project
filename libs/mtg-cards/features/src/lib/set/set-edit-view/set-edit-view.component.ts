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
export class SetEditComponent {}
