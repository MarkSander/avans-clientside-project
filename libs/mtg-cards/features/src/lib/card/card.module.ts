import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from './card.service';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardEditComponent } from './card-edit/card-edit.component';

const routes: Routes = [
  {
    path: '',
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
  declarations: [CardListComponent, CardDetailComponent, CardEditComponent],
  providers: [CardService],
  exports: [
    CardListComponent,
    RouterModule,
    CardDetailComponent,
    CardEditComponent,
  ],
})
export class CardModule {}
