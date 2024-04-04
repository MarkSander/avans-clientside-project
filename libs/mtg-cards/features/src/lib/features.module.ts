import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { CardListComponent } from './card/card-list/card-list.component';
//import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from './card/card.service';
import { NavComponent } from './nav/nav.component';
import { SetService } from './set/set.service';
import { DeckService } from './deck/deck.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, NavComponent],
  // declarations: [AboutComponent],
  providers: [CardService, SetService, DeckService],
  exports: [NavComponent],
})
export class FeaturesModule {}
