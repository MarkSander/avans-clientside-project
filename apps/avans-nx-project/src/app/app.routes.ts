import { Route } from '@angular/router';
import { AboutComponent } from '@avans-nx-project/mtg-cards/features';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
];
