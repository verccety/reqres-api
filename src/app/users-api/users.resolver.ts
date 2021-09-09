import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<User> {
  constructor(private usersApiService: UsersApiService) {}

  resolve(route: ActivatedRouteSnapshot) {

    const { id } = route.params;
    return this.usersApiService.getUser(id).pipe(
      catchError(() => {
        return EMPTY;
      })
    );
  }
}
