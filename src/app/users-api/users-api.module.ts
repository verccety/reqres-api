import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersApiRoutingModule } from './users-api-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UsersApiRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports: [UsersListComponent]
})
export class UsersApiModule { }
