import { Route } from '@angular/router';
import {
  AboutComponent,
  CardDetailComponent,
  CardListComponent,
} from '@avans-nx-project/mtg-cards/features';
export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: 'cardDetail', pathMatch: 'full', component: CardDetailComponent },
  { path: 'cardList', pathMatch: 'full', component: CardListComponent },
];
