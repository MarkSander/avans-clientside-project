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
import { SetService } from '../set/set.service';
import { ImageService } from '../image/image.service';

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
    path: ':id/edit',
    pathMatch: 'full',
    component: CardEditComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: CardDetailComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [CardListComponent, CardEditComponent, CardDetailComponent],
  providers: [CardService, DeckService, SetService, ImageService],
  exports: [
    CardListComponent,
    CardEditComponent,
    CardDetailComponent,
    RouterModule,
  ],
})
export class CardModule {}
