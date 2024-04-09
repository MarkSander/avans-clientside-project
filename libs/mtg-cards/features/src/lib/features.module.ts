import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { CardListComponent } from './card/card-list/card-list.component';
//import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from './card/card.service';
import { SetService } from './set/set.service';
import { DeckService } from './deck/deck.service';
import { AlertModule } from '@avans-nx-workshop/mtg-cards/alert';
//import { AuthService } from '@avans-nx-project/mtg-cards/user-auth';

@NgModule({
  //declarations: [NavComponent],
  imports: [CommonModule, HttpClientModule, AlertModule],
  // declarations: [AboutComponent],
  providers: [CardService, SetService, DeckService],
  //exports: [NavComponent],
})
export class FeaturesModule {}
