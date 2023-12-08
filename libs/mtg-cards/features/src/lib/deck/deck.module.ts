import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckListComponent } from './deck-list/deck-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DeckService } from './deck.service';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
/* import { DeckEditComponent } from './deck-edit/deck-edit.component'; */

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DeckListComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: DeckDetailComponent,
  },
  /*   {
    path: 'edit/:id',
    pathMatch: 'full',
    component: DeckEditComponent,
  }, */
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [DeckListComponent],
  providers: [DeckService],
  exports: [DeckListComponent, RouterModule],
})
export class DeckModule {}
