import { Injectable } from '@angular/core';

import { Store } from 'src/app/app.store';

import User from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserHelperService {
  constructor(private store: Store) {}

  removePasswordFromObject(user: User): User {
    let newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      isSeller: user.isSeller,
    };

    return newUser;
  }
}
