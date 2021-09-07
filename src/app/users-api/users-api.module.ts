import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersApiRoutingModule } from './users-api-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserDetailComponent } from './user-detail/user-detail.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UsersApiRoutingModule,
    FontAwesomeModule
  ],
  exports: [UsersListComponent]
})
export class UsersApiModule { }
