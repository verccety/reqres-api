import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserDetailComponent } from './users-api/user-detail/user-detail.component';
import { UsersListComponent } from './users-api/users-list/users-list.component';
import { UsersResolver } from './users-api/users.resolver';

//TODO canActivate: [AuthGuard]

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    resolve: { user: UsersResolver },
    canActivate: [AuthGuard],
  },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
