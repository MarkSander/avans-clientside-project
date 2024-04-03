import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from './card.service';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardEditComponent } from './card-edit/card-edit.component';
import { DeckService } from '../deck/deck.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CardListComponent,
  },
  {
    path: 'new',
    pathMatch: 'full',
    component: CardEditComponent,
  },
  {
    path: 'deck/:id',
    pathMatch: 'full',
    component: CardListComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: CardDetailComponent,
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    component: CardEditComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [CardListComponent, CardEditComponent],
  providers: [CardService, DeckService],
  exports: [CardListComponent, CardEditComponent, RouterModule],
})
export class CardModule {}
