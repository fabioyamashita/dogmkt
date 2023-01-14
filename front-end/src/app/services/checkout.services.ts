import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '../app.store';

import Cart from 'src/app/checkout/models/cart';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient, private store: Store) {}

  protected UrlServiceV1: string = 'http://localhost:3000/';

  getCart: Observable<Cart> = this.http
    .get<Cart>(this.UrlServiceV1 + 'cart')
    .pipe(tap((next) => this.store.set('cart', next)));

  updateCart = (cart: Cart): Observable<Cart> =>
    this.http
      .put<Cart>(this.UrlServiceV1 + 'cart', cart)
      .pipe(tap((next) => this.store.set('cart', next)));
}
