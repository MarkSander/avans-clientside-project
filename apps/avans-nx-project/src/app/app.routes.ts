import { Route } from '@angular/router';
/* import {
  AboutComponent,
  CardDetailComponent,
  CardListComponent,
} from '@avans-nx-project/mtg-cards/features'; */
export const appRoutes: Route[] = [
  {
    path: 'cards',
    loadChildren: () =>
      import('@avans-nx-project/mtg-cards/features').then((c) => c.CardModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('@avans-nx-project/mtg-cards/features').then(
        (c) => c.AboutComponent
      ),
  },

  /*   { path: '', pathMatch: 'full', redirectTo: '' },

  { path: 'cardDetail', pathMatch: 'full', component: CardDetailComponent },
  { path: 'cardList', pathMatch: 'full', component: CardListComponent }, */
];
