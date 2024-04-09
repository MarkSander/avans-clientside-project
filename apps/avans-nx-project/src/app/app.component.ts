import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
//import { FeaturesModule } from '@avans-nx-project/mtg-cards/features';
//import { AlertModule } from '@avans-nx-workshop/mtg-cards/alert';
import { NavComponent } from '@avans-nx-project/ui';
//import { AuthModule } from '@avans-nx-project/mtg-cards/user-auth';
//import { AuthModule } from '@avans-nx-workshop/mtg-cards/user-auth';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    //FeaturesModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    //AlertModule,
    //AuthModule,
    NavComponent,
  ],
  selector: 'avans-nx-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'avans-nx-project';
}
