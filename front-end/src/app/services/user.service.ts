import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from 'src/app/services/base.service';
import { Store } from '../app.store';

import User from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(private http: HttpClient, private store: Store) {
    super();
  }

  getUsers: Observable<User[]> = this.http
    .get<User[]>(this.UrlServiceV1 + 'users')
    .pipe(tap((next) => this.store.set('users', next)));

  getById = (id: string): Observable<User> =>
    this.http.get<User>(this.UrlServiceV1 + 'users' + '/' + id);
}
