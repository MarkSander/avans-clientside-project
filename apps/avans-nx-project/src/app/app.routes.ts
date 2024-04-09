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
  {
    path: 'users',
    loadChildren: () =>
      import('@avans-nx-project/mtg-cards/features').then((c) => c.UserModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('@avans-nx-project/mtg-cards/features').then((c) => c.AboutModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@avans-nx-project/mtg-cards/user-auth').then((c) => c.AuthModule),
  },
  { path: '', pathMatch: 'full', redirectTo: '' },
  /* { path: 'about', pathMatch: 'full', component: AboutComponent }, */
];
