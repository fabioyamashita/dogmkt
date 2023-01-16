import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '../app.store';
import { BaseService } from './base.service';

import Cart from 'src/app/models/cart';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService extends BaseService {
  constructor(private http: HttpClient, private store: Store) {
    super();
  }

  getCart: Observable<Cart> = this.http
    .get<Cart>(this.UrlServiceV1 + 'cart')
    .pipe(tap((next) => this.store.set('cart', next)));

  updateCart = (cart: Cart): Observable<Cart> =>
    this.http
      .put<Cart>(this.UrlServiceV1 + 'cart', cart)
      .pipe(tap((next) => this.store.set('cart', next)));
}
