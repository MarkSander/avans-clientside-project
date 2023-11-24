import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from './card.service';
import { CardDetailComponent } from './card-detail/card-detail.component';

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
];
@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes)],
  declarations: [CardListComponent, CardDetailComponent],
  providers: [CardService],
  exports: [CardListComponent, RouterModule, CardDetailComponent],
})
export class CardModule {}
