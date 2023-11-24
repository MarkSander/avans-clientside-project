import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from './card/card.service';
import { NavComponent } from './nav/nav.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, NavComponent],
  declarations: [AboutComponent],
  providers: [CardService],
  exports: [AboutComponent, NavComponent],
})
export class FeaturesModule {}
