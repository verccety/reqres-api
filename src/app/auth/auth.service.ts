import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupResponse {
  id: number;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://reqres.in/api';
  signedin$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  signup(credentials: LoginCredentials) {
    return this.http
      .post<SignupResponse>(this.url + '/register', credentials)
      .pipe(
        tap(({ token }) => {
          this.signedin$.next(true);
        }),
        catchError((err) => {
console.log(err.error);

          this.notificationsService.addError(err.error.error);
          return throwError(err);
        })
      );
  }

  signin(credentials: LoginCredentials) {
    return this.http
      .post<{ token: string }>(this.url + '/login', credentials)
      .pipe(
        tap(({ token }) => {
          this.signedin$.next(true);
        })
      );
  }
}
