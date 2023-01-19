import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from 'src/app/services/base.service';
import { Store } from '../app.store';

import User from '../models/user';
import { UserHelperService } from './user.helper.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    private http: HttpClient,
    private store: Store,
    private userHelperService: UserHelperService
  ) {
    super();
  }

  getUsers: Observable<User[]> = this.http
    .get<User[]>(this.UrlServiceV1 + 'users', super.getAuthHttpHeaders())
    .pipe(
      tap((next) =>
        this.store.set(
          'users',
          next.map((user) =>
            this.userHelperService.removePasswordFromObject(user)
          )
        )
      )
    );

  getById = (id: number): Observable<User> =>
    this.http.get<User>(
      this.UrlServiceV1 + 'users' + '/' + id,
      super.getAuthHttpHeaders()
    );

  createUser(newUser: User): Observable<User> {
    if (!newUser.isSeller) newUser.isSeller = false;

    return this.http
      .post<User>(
        this.UrlServiceV1 + 'users/register',
        newUser,
        super.getHttpHeaders()
      )
      .pipe(
        tap((next) => {
          let updatedUsers = this.store.value.users;
          updatedUsers.push(
            this.userHelperService.removePasswordFromObject(newUser)
          );
          this.store.set('users', updatedUsers);
        })
      );
  }
}
