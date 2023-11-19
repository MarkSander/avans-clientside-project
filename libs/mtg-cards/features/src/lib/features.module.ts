import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card/card-list/card-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from './card/card.service';
import { CardDetailComponent } from './card/card-detail/card-detail.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, CardDetailComponent],
  declarations: [CardListComponent],
  providers: [CardService],
  exports: [CardListComponent, CardDetailComponent],
})
export class FeaturesModule {}
