import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AboutComponent,
  },
];

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [AboutComponent],
})
export class AboutModule {}
