import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './user-edit/user-edit.component';
import { DeckService } from '../deck/deck.service';
/* import { UserEditComponent } from './user-edit/user-edit.component'; */

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserListComponent,
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: UserEditComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: UserDetailComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [UserListComponent, UserEditComponent, UserDetailComponent],
  providers: [UserService, DeckService],
  exports: [
    UserListComponent,
    RouterModule,
    UserEditComponent,
    UserDetailComponent,
  ],
})
export class UserModule {}
