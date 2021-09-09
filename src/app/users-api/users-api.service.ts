import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, pluck, tap } from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Resourse {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface UsersApiResponse {
  data: User[];
}

export interface ResourseApiResponse {
  data: Resourse[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private url = 'https://reqres.in/api';

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getUsers() {
    return this.http.get<UsersApiResponse>(this.url + '/users').pipe(
      pluck('data'),
      catchError((err) => {
        this.notificationsService.addError(
          'Ошибка при получении списка пользователей'
        );
        return throwError(err);
      })
    );
  }

  getUser(id: string) {
    return this.http.get<{ data: User }>(this.url + '/users/' + id).pipe(
      pluck('data'),
      catchError((err) => {
        this.notificationsService.addError('Ошибка при получении данных');
        return throwError(err);
      })
    );
  }

  editUser(id: string, user: Omit<User, 'id' | 'avatar'>) {
    return this.http.put(this.url + '/users' + id, user).pipe(
      tap(() =>
        this.notificationsService.addSuccess('Данные успешно изменены')
      ),
      catchError((err) => {
        this.notificationsService.addError('Ошибка при изменении данных');
        return throwError(err);
      })
    );
  }

  deleteUser(id: string) {
    return this.http.delete(this.url + '/users' + id).pipe(
      tap(() =>
        this.notificationsService.addSuccess('Пользователь успешно удален')
      ),
      catchError((err) => {
        this.notificationsService.addError('Ошибка при удалении пользователя');
        return throwError(err);
      })
    );
  }
  getResources() {
    return this.http
      .get<ResourseApiResponse>(this.url + '/unknown')
      .pipe(pluck('data'));
  }
}
