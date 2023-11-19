import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card/card-list/card-list.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from './card/card.service';
import { CardDetailComponent } from './card/card-detail/card-detail.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, CardDetailComponent],
  declarations: [CardListComponent, AboutComponent, NavComponent],
  providers: [CardService],
  exports: [
    CardListComponent,
    CardDetailComponent,
    AboutComponent,
    NavComponent,
  ],
})
export class FeaturesModule {}
