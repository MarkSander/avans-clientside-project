import { Route } from '@angular/router';
/* import { AboutComponent } from '@avans-nx-project/mtg-cards/features';
 */
export const appRoutes: Route[] = [
  {
    path: 'cards',
    loadChildren: () =>
      import('@avans-nx-project/mtg-cards/features').then((c) => c.CardModule),
  },
  {
    path: 'sets',
    loadChildren: () =>
      import('@avans-nx-project/mtg-cards/features').then((c) => c.SetModule),
  },
  {
    path: 'decks',
    loadChildren: () =>
      import('@avans-nx-project/mtg-cards/features').then((c) => c.DeckModule),
  },
  { path: '', pathMatch: 'full', redirectTo: '' },
  /* { path: 'about', pathMatch: 'full', component: AboutComponent }, */
];
