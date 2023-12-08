import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckListComponent } from './deck-list/deck-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DeckService } from './deck.service';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeckCreateComponent } from './deck-create/deck-create.component';
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
  {
    path: 'create',
    pathMatch: 'full',
    component: DeckCreateComponent,
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
  declarations: [DeckListComponent, DeckCreateComponent],
  providers: [DeckService],
  exports: [DeckListComponent, RouterModule, DeckCreateComponent],
})
export class DeckModule {}
