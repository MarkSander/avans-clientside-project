import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SetEditComponent } from './set-edit-view/set-edit-view.component';
import { SetlistComponent } from './set-list-view/setlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SetService } from './set.service';
import { HttpClientModule } from '@angular/common/http';
import { SetDetailComponent } from './set-detail/set-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SetlistComponent },
  {
    path: 'new',
    pathMatch: 'full',
    component: SetEditComponent,
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: SetEditComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: SetDetailComponent,
  },
];

@NgModule({
  declarations: [SetlistComponent, SetEditComponent, SetDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
  providers: [SetService],
  exports: [
    RouterModule,
    SetlistComponent,
    SetDetailComponent,
    SetEditComponent,
  ],
})
export class SetModule {}
