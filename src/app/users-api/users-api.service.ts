import { Injectable } from '@angular/core';
import { tap, map, switchMap, pluck } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface Resourse {
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

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get<UsersApiResponse>(this.url + '/users')
      .pipe(pluck('data'));
  }

  getUser(id: string) {
    return this.http
      .get<{ data: User }>(this.url + '/users/' + id)
      .pipe(pluck('data'));
  }

  editUser(id: string, user: any) {
    return this.http.put(this.url + '/users', user);
  }

  deleteUser(id: string) {
    return this.http.delete(this.url + '/users' + id);
  }
  getResources() {
    return this.http.get<ResourseApiResponse>(this.url + '/unknown');
  }
}
