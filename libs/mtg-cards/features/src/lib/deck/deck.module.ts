import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckListComponent } from './deck-list/deck-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DeckService } from './deck.service';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeckCreateComponent } from './deck-create/deck-create.component';
import { UserService } from '../user/user.service';
/* import { DeckEditComponent } from './deck-edit/deck-edit.component'; */

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DeckListComponent,
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: DeckCreateComponent,
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: DeckCreateComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: DeckDetailComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [DeckListComponent, DeckCreateComponent, DeckDetailComponent],
  providers: [DeckService, UserService],
  exports: [
    DeckListComponent,
    RouterModule,
    DeckCreateComponent,
    DeckDetailComponent,
  ],
})
export class DeckModule {}
