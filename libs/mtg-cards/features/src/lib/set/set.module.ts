import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SetEditComponent } from './set-edit-view/set-edit-view.component';
import { SetlistComponent } from './set-list-view/setlist.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: SetEditComponent,
  },
  { path: '', pathMatch: 'full', component: SetlistComponent },
];

@NgModule({
  declarations: [SetlistComponent, SetEditComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class SetModule {}
